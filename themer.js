import { html } from "https://cdn.jsdelivr.net/npm/lit-html@2.4.0/lit-html.min.js";
import { repeat } from "https://cdn.jsdelivr.net/npm/lit-html@2.4.0/directives/repeat.js";

let THEME = "nord";

function getAvailableThemes() {
  for (const sheet of document.styleSheets) {
    if (sheet.title === "themes") {
      return sheet.cssRules;
    }
  }
}

function changeTheme(new_theme) {
  const r = document.body;
  r.style.removeProperty("--black");
  r.style.removeProperty("--white");
  r.classList.replace(THEME, new_theme);
  THEME = new_theme;
}

const themeButton = (themeName) =>
  html`<button
    style="--buttonColor: var(--blue)"
    @click=${(e) => changeTheme(themeName.slice(1))}>
    ${themeName.slice(1)}
  </button>`;

const themeSettings = html`<div id="themeButtonContainer">
  ${repeat(getAvailableThemes(), (rule) => themeButton(rule.selectorText))}
</div>`;

export { themeSettings };
