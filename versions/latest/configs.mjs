/**
 * @overview App configurations of <i>ccmjs</i>-based web component for a code editor that uses CodeMirror 5.
 * @author André Kless <andre.kless@web.de> 2023
 * @license The MIT License (MIT)
 * @version latest (v1)
 */

export const html = {
  "data": {
    "input":
`<header>
  <div id="logo"></div>
  <div id="title"></div>
  <div id="login"></div>
</header>
<main>
  <nav></nav>
  <section>
    <article>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
    </article>
    <article>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
    </article>
  </section>
  <aside></aside>
</main>
<footer></footer>`
  },
  "directly": true,
  "libs.1.1.5": "https://ccmjs.github.io/libs/codemirror-5/xml.js",
  "libs.1.1.6": "https://ccmjs.github.io/libs/codemirror-5/xml-fold.js",
  "libs.1.1.7": "https://ccmjs.github.io/libs/codemirror-5/matchtags.js",
  "libs.1.1.8": "https://ccmjs.github.io/libs/codemirror-5/htmlmixed.js",
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
  "libs.1.1.5": "https://ccmjs.github.io/libs/codemirror-5/css.js",
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
  "libs.1.1.5": "https://ccmjs.github.io/libs/codemirror-5/javascript.js",
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
  "libs.1.1.5": "https://ccmjs.github.io/libs/codemirror-5/javascript.js",
  "settings.mode": { "name": "javascript", "json": true }
};

export const mixed = {
  "data": {
    "input":
`<style>
  body: {
    color: limegreen;
  }
</style>
<header>
  <div id="logo"></div>
  <div id="title"></div>
  <div id="login"></div>
</header>
<main>
  <nav></nav>
  <section>
    <article>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
    </article>
    <article>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
    </article>
  </section>
  <aside></aside>
</main>
<footer></footer>
<script>
  function sayHello( name ) {
    alert( 'Hello ' + name + '!' );
  }
  sayHello( prompt( 'Name:' ) );
</script>`
  },
  "directly": true,
  "libs.1.1.5": "https://ccmjs.github.io/libs/codemirror-5/xml.js",
  "libs.1.1.6": "https://ccmjs.github.io/libs/codemirror-5/xml-fold.js",
  "libs.1.1.7": "https://ccmjs.github.io/libs/codemirror-5/matchtags.js",
  "libs.1.1.8": "https://ccmjs.github.io/libs/codemirror-5/htmlmixed.js",
  "libs.1.1.9": "https://ccmjs.github.io/libs/codemirror-5/css.js",
  "libs.1.1.10": "https://ccmjs.github.io/libs/codemirror-5/javascript.js",
  "settings.matchTags": true,
  "settings.mode": "htmlmixed"
};
