// This is where I customize the functions that the marked.js renderer calls

/***********************************
              HEADINGS
************************************/
function heading(text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

  return String.raw`<h${level} class="marked-h${level}">
    <a
      name="${escapedText}"
      class="anchor"
      href="#${escapedText}">
      <span class="header-link"></span> </a
    >${text}
  </h${level}>`;
}

/***********************************
            CODE BLOCK
************************************/
// Uses the escape map to sanitize html-containing strings
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

function code(code, options) {
  const language = options;
  const validLang = !!(language && hljs.getLanguage(language));

  const highlighted = validLang
    ? hljs.highlight(language, code).value
    : escapeForHTML(code);
  return String.raw`
    <div class="marked-codeblock" language=${language}>
      <pre><code class="hljs ${language}">${highlighted}</code></pre>
    </div>`;
}

/***********************************
            PARAGRAPH
************************************/
function paragraph(text) {
  return String.raw`<p class="marked-paragraph">${text}</p>`;
}

/***********************************
              BREAK
************************************/
function br() {
  return String.raw`<br/>`;
}

/***********************************
              STRONG
************************************/
function strong(text) {
  return String.raw`<span class="marked-strong">${text}</span>`;
}

/***********************************
              EMPH
************************************/
function em(text) {
  return String.raw`<span class="marked-emph">${text}</span>`;
}

/***********************************
            CODESPAN
************************************/
function codespan(code) {
  return String.raw`<span class="marked-codespan">${code}</span>`;
}

/***********************************
          STRIKETHROUGH
************************************/
function del(text) {
  return String.raw`<span class="marked-strikethrough">${text}</span>`;
}

/***********************************
              LINK
************************************/
function link(href, title, text) {
  return String.raw`<a href=${href} title=${title} class="marked-link"><span >${text}</span></a>`;
}

/***********************************
              RENDERER
************************************/
const renderer = {
  heading,
  code,
  paragraph,
  br,
  strong,
  em,
  codespan,
  del,
  link,
};

// Set the marked renderer to my custom renderer
marked.use({ renderer });

export const renderMarkdown = (markdown, element) => {
  element.innerHTML = marked.parse(markdown);
};
