import { html, render, repeat } from "./libs/lit-html.js";
import { renderMarkdown } from "./renderer.js";
import { getAvailableThemes, changeTheme } from "./themer.js";

const availableSnippets = ["python", "lua", "js", "css", "json", "markdown"];
const colors = [
  "black",
  "white",
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
];

const controlButton = (buttonText, buttonColor, buttonAction) => html`<button
  style="--buttonColor: var(--${buttonColor})"
  class="controlButton"
  @click=${buttonAction}>
  ${buttonText}
</button>`;

const themeButtons = (themes) => html`<h3 class="controlHeading">themes</h3>
  <div class="controlButtonContainer">
    ${repeat(themes, (rule) => {
      const text = rule.selectorText.slice(1);
      return controlButton(text, "blue", (e) => changeTheme(text));
    })}
  </div>`;

const snippetButtons = (snippets) => html`<h3 class="controlHeading">
    snippets
  </h3>
  <div class="controlButtonContainer">
    ${repeat(snippets, (snippet) =>
      controlButton(snippet, "green", (e) => renderPreview(snippet))
    )}
  </div>`;

const view = html`<div id="view">
  <div id="colors">
    ${repeat(
      colors.slice(1),
      (color) =>
        html`<div
          class="colorblock"
          style="--color: var(--${color})"></div>`
    )}
  </div>
  <div id="controls"></div>
  <div id="preview"></div>
</div>`;

const controls = (themes, snippets) => html`
  <h1 class="siteTitle">theme-gen</h1>
  <div id="themes">${themes}</div>
  <div id="snippets">${snippets}</div>
`;

function renderControls() {
  render(
    controls(
      themeButtons(getAvailableThemes()),
      snippetButtons(availableSnippets)
    ),
    document.getElementById("controls")
  );
}

function renderPreview(exName) {
  // Fetch a markdown file and render it with marked
  fetch(`./content/${exName}.md`)
    .then((response) => response.blob())
    .then((blob) => blob.text())
    .then((markdown) =>
      renderMarkdown(markdown, document.getElementById("preview"))
    );
}

window.onload = function () {
  render(view, document.body);
  renderControls();
  renderPreview("python");
};
