'use strict';

/**
 * @overview <i>ccmjs</i>-based web component for a code editor that uses CodeMirrow 5.
 * @author André Kless <andre.kless@web.de> 2023
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 */

( () => {
  const component = {
    name: 'code_editor',
    ccm: './libs/ccm/ccm.js',
    config: {
      "css": [ "ccm.load",
        [
          "./libs/codemirror/foldgutter.css",
          "./resources/styles.css"
        ]
      ],
      // "data": { "abc": true, "foo": { "bar": [ 1, 2, 3 ] }, "xyz": () => {} },
      // "directly": true,
      "helper": [ "ccm.load", { "url": "./libs/ccm/helper.js", "type": "module" } ],
      "html": [ "ccm.load", { "url": "./resources/templates.js", "type": "module" } ],
      "libs": [ "ccm.load",
        "./libs/codemirror/codemirror.css",
        [
          "./libs/codemirror/codemirror.js",
          [
            "./libs/codemirror/brace-fold.js",
            "./libs/codemirror/closebrackets.js",
            "./libs/codemirror/foldcode.js",
            "./libs/codemirror/foldgutter.js",
            "./libs/codemirror/javascript.js",
            "./libs/codemirror/matchbrackets.js"
          ]
        ]
      ],
      // "onfinish": event => console.log( event ),
      // "oninput": event => console.log( event ),
      // "onready": event => console.log( event ),
      // "onstart": event => console.log( event ),
      "settings": {
        "autoCloseBrackets": true,
        "autofocus": false,
        "foldGutter": true,
        "gutters": [ "CodeMirror-linenumbers", "CodeMirror-foldgutter" ],
        "lineNumbers": true,
        "lineWrapping": true,
        "matchBrackets": true,
        "mode": "javascript",
        "tabSize": 2
      },
      "shadow": "open",
      "text": [ "ccm.load", { "url": "./resources/resources.js#de", "type": "module" } ]
    },
    Instance: function () {
      let $, data;
      this.init = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );
      };
      this.ready = async () => {
        this.onready && await this.onready( { instance: this } );
      };
      this.start = async () => {
        data = await $.dataset( this.data );
        if ( !data.input ) data = { input: data };
        this.html.render( this.html.main( this ), this.element );
        this.element.querySelector( 'textarea' ).innerHTML = $.stringify( data.input, null, this.settings.tabSize );
        this.editor = CodeMirror.fromTextArea( this.element.querySelector( 'textarea' ), this.settings );
        this.editor.setCursor( this.editor.lineCount(), 0 );
        this.editor.on( 'change', this.events.onInput );
        this.onstart && await this.onstart( { instance: this } );
      };
      this.events = {
        onInput: () => {
          try {
            data.input = $.parse( this.editor.getValue() );
            data.valid = true;
          } catch ( err ) {
            data.valid = false;
          }
          this.element.querySelector( '.CodeMirror' ).classList[ data.valid ? 'remove' : 'add' ]( 'invalid' );
          this.element.querySelector( 'button' ).disabled = !data.valid;
          this.oninput && this.oninput( { instance: this } );
        },
        onSubmit: () => {
          delete this.editor;
          $.onFinish( this );
        }
      };
      this.getValue = () => $.clone( this.directly ? data.input : data );
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();