/**
 * @overview App configurations of <i>ccmjs</i>-based web component for a code editor that uses CodeMirror 5.
 * @author André Kless <andre.kless@web.de> 2023
 * @license The MIT License (MIT)
 */

export const html = {
  "data": {
    "input":
`<b>Welcome</b> 👋
<p>
  This is an example of an HTML editor.
</p>
<p>
  Click the button to see the result!
</p>`
  },
  "directly": true,
  "libs.1.1.5": "./libs/codemirror/xml.js",
  "libs.1.1.6": "./libs/codemirror/xml-fold.js",
  "libs.1.1.7": "./libs/codemirror/matchtags.js",
  "libs.1.1.8": "./libs/codemirror/htmlmixed.js",
  "preview": true,
  "settings.matchTags": true,
  "settings.mode": "htmlmixed"
};

export const css = {
  "data": {
    "input":
`body {
  margin: 0;
  font-size: large;
  color: limegreen;
}

div {
  padding: 0.5em;
  border: 1px solid black;
  border-radius: 5px;
}`
  },
  "directly": true,
  "libs.1.1.5": "./libs/codemirror/css.js",
  "settings.mode": "css"
};

export const js = {
  "data": {
    "input":
`( function () {
  return {
    "abc": true,
    "foo": {
      "bar": [
        1,
        2,
        3
      ]
    },
    "xyz": () => console.log( '!' )
  };
} )()`
  },
  "directly": true,
  "libs.1.1.5": "./libs/codemirror/javascript.js",
  "settings.mode": "javascript",
};

export const json = {
  "data": {
    "input":
`{
  "abc": true,
  "foo": {
    "bar": [
      1,
      2,
      3
    ]
  },
  "xyz": null
}`
  },
  "directly": true,
  "libs.1.1.5": "./libs/codemirror/javascript.js",
  "settings.mode": { "name": "javascript", "json": true }
};

export const mixed = {
  "data": {
    "input":
`<style>
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
          Click the button to see the result!
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
  "libs.1.1.5": "./libs/codemirror/xml.js",
  "libs.1.1.6": "./libs/codemirror/xml-fold.js",
  "libs.1.1.7": "./libs/codemirror/matchtags.js",
  "libs.1.1.8": "./libs/codemirror/htmlmixed.js",
  "libs.1.1.9": "./libs/codemirror/css.js",
  "libs.1.1.10": "./libs/codemirror/javascript.js",
  "preview": true,
  "settings.matchTags": true,
  "settings.mode": "htmlmixed"
};
