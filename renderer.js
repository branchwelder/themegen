// Inserts heading ahcnors
function heading(text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

  return `
      <h${level} class="heading${level}">
      <a name="${escapedText}" class="anchor" href="#${escapedText}">
          <span class="header-link"></span>
      </a>
      ${text}
      </h${level}>`;
}

// Uses the escape map to make an html-containing string nice
const escapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeForHTML(input) {
  return input.replace(/([&<>'"])/g, (char) => escapeMap[char]);
}

// Handles code syntax highlighting
function code(code, options) {
  const language = options;
  const validLang = !!(language && hljs.getLanguage(language));

  const highlighted = validLang
    ? hljs.highlight(language, code).value
    : escapeForHTML(code);
  return `<div class="desc"><span class="codeHead">${language}</span></div><div class="codeblock"><pre><code class="hljs ${language}">${highlighted}</code></pre></div>`;
}

// Build a custom renderer for marked
const renderer = {
  heading,
  code,
};

export { renderer };
