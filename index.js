import {
  html,
  render,
} from "https://cdn.jsdelivr.net/npm/lit-html@2.4.0/lit-html.min.js";
import { repeat } from "https://cdn.jsdelivr.net/npm/lit-html@2.4.0/directives/repeat.js";

import { renderer } from "./renderer.js";
import { themeSettings } from "./themer.js";

// Set the marked renderer to my custom renderer
marked.use({ renderer });

const exButton = (exName) => html`<button
  style="--buttonColor: var(--green)"
  @click=${(e) => renderHighlightedCode(exName)}>
  ${exName}
</button>`;

const exampleNav = (examples) => html`<div id="themeButtonContainer">
  ${repeat(examples, (ex) => exButton(ex))}
</div>`;

function renderNav(examples) {
  render(exampleNav(examples), document.getElementById("nav"));
}

function renderHighlightedCode(exName) {
  // Fetch a markdown file and render it with marked
  fetch(`./content/${exName}.md`)
    .then((response) => response.blob())
    .then((blob) => blob.text())
    .then(
      (markdown) =>
        (document.getElementById("content").innerHTML = marked.parse(markdown))
    );
}

window.onload = function () {
  render(themeSettings, document.getElementById("settings"));
  renderNav(["python", "lua", "js", "css", "json", "markdown"]);
  renderHighlightedCode("markdown");
};
