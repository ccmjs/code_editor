/**
 * @overview App configurations of <i>ccmjs</i>-based web component for a code editor that uses CodeMirror 5.
 * @author André Kless <andre.kless@web.de> 2023
 * @license The MIT License (MIT)
 */

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
  "mode": "javascript",
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
