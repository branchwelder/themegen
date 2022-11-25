function getAvailableThemes() {
  for (const sheet of document.styleSheets) {
    if (sheet.title === "themes") {
      return sheet.cssRules;
    }
  }
}

function changeTheme(current_theme, new_theme) {
  const r = document.body;
  r.classList.replace(current_theme, new_theme);
}

export { getAvailableThemes, changeTheme };
