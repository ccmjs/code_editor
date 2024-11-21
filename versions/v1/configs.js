/**
 * @overview App configurations of <i>ccmjs</i>-based web component for a code editor that uses CodeMirror 5.
 * @author André Kless <andre.kless@web.de> 2023
 * @license The MIT License (MIT)
 */

export const html = {
  "data": {
    "input": `<b>Welcome</b> 👋
<p>
  This is an example of an HTML editor.
</p>
<p>
  Click the [Run >>] button below the code editor to update the result!
</p>`
  },
  "directly": true,
  "libs.1.1.5": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/xml.min.js",
  "libs.1.1.6": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/xml-fold.min.js",
  "libs.1.1.7": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/matchtags.min.js",
  "libs.1.1.8": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/htmlmixed.min.js",
  "preview": true,
  "settings.matchTags": true,
  "settings.mode": "htmlmixed",
  "text": {
    "submit": "Run >>"
  }
};

export const css = {
  "data": {
    "input": `body {
  background-color: #ccc;
  font-family: Arial, sans-serif;
}
b {
  text-decoration: underline;
}
p {
  font-size: smaller;
}`
  },
  "directly": true,
  "libs.1.1.5": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/css.min.js",
  "preview": `
    <b>Welcome</b> 👋
    <p>
      This is an example of an CSS editor.
    </p>
    <p>
      Click the [Run >>] button below the code editor to update the result!
    </p>
  `,
  "settings.mode": "css",
  "text": {
    "submit": "Run >>"
  }
};

export const js = {
  "data": {
    "input":
`document.querySelector( 'button' ).addEventListener( 'click', sayHello );
function sayHello() {
  const name = prompt( 'Name:' );
  alert( 'Hello ' + name + ' 🙂' );
}`
  },
  "directly": true,
  "libs.1.1.5": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/javascript.min.js",
  "preview": `
    <b>Welcome</b> 👋
    <p>
      This is an example of an JS editor.
    </p>
    <p>
      Click the [Run >>] button below the code editor to update the result!
    </p>
    <button>Say Hello</button>
  `,
  "settings.mode": "javascript",
  "text": {
    "submit": "Run >>"
  }
};

export const mixed = {
  "data": {
    "input": `<style>
  body {
    margin: 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
    text-align: center;
    font-family: Arial, sans-serif;
    height: 100%;
  }
  header, footer {
    background-color: #aaa;
    padding: 0.2em;
  }
  main {
    display: grid;
    grid-template-columns: auto 1fr auto;
  }
  nav {
    background-color: #ccc;
    display: flex;
    flex-direction: column;
  }
  nav a {
    padding: 0.3em 0.5em;
    cursor: pointer;
  }
  nav a:hover {
    background-color: #bbb;
  }
  section {
    text-align: left;
  }
  article {
    padding: 0.3em 0.5em;
  }
  aside {
    background-color: #ccc;
    padding: 0.2em;
  }
</style>
<body>
  <header>HEADER</header>
  <main>
    <nav>
      <a>Start</a>
      <a>About</a>
    </nav>
    <section>
      <article>
        <b>Welcome</b> 👋
        <p>
          This is an example of a mixed editor for HTML, CSS and JS.
        </p>
        <p>
          Click the [Run >>] button below the code editor to update the result!
        </p>
        <button>Say Hello</button>
      </article>
    </section>
    <aside>ASIDE</aside>
  </main>
  <footer>FOOTER</footer>
  <script>
    document.querySelector( 'button' ).addEventListener( 'click', sayHello );
    function sayHello() {
      const name = prompt( 'Name:' );
      alert( 'Hello ' + name + ' 🙂' );
    }
  </script>
</body>`
  },
  "directly": true,
  "libs.1.1.5": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/xml.min.js",
  "libs.1.1.6": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/xml-fold.min.js",
  "libs.1.1.7": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/matchtags.min.js",
  "libs.1.1.8": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/htmlmixed.min.js",
  "libs.1.1.9": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/css.min.js",
  "libs.1.1.10": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/javascript.min.js",
  "preview": true,
  "settings.matchTags": true,
  "settings.mode": "htmlmixed",
  "text": {
    "submit": "Run >>"
  }
};

export const bootstrap = {
  "data": {
    "input": `
<div class="d-flex flex-column h-100">
  <header class="bg-secondary text-center">HEADER</header>
  <main class="h-100 d-flex w-100">
    <nav class="d-flex flex-column bg-light">
      <a class="btn btn-link">Start</a>
      <a class="btn btn-link">About</a>
    </nav>
    <section class="w-100">
      <article class="p-3">
        <b>Welcome</b> 👋
        <p class="pt-3">
          This is an example of a mixed editor for HTML, CSS and JS.
        </p>
        <p>
          Click the [Run >>] button below the code editor to update the result!
        </p>
      </article>
    </section>
    <aside class="bg-light p-2">ASIDE</aside>
  </main>
  <footer class="bg-secondary text-center">FOOTER</footer>
</div>`
  },
  "directly": true,
  "libs.1.1.5": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/xml.min.js",
  "libs.1.1.6": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/xml-fold.min.js",
  "libs.1.1.7": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/matchtags.min.js",
  "libs.1.1.8": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/htmlmixed.min.js",
  "preview": `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">`,
  "settings.matchTags": true,
  "settings.mode": "htmlmixed",
  "text": {
    "submit": "Run >>"
  }
};

export const json = {
  "data": {
    "abc": true,
    "foo": {
      "bar": [
        1,
        2,
        3
      ]
    },
    "hint": "Click the [Log] button below the code editor to see the result in the developer console!",
    "xyz": null
  },
  "directly": true,
  "libs.1.1.5": "https://akless.github.io/ccm-code_editor/versions/v1/libs/codemirror/javascript.min.js",
  "settings.mode": { "name": "javascript", "json": true },
  "text": {
    "submit": "Log"
  }
};
