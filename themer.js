let THEME = "blue-hour";

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

export { getAvailableThemes, changeTheme };
