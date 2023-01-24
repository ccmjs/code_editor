'use strict';

/**
 * @overview <i>ccmjs</i>-based web component for a code editor that uses CodeMirrow 5.
 * @author André Kless <andre.kless@web.de> 2023
 * @license The MIT License (MIT)
 */

( () => {
  const component = {
    name: 'code_editor',
    ccm: './libs/ccm/ccm.js',
    config: {
      "css": [ "ccm.load",
        [
          [
            "./libs/codemirror/codemirror.css",
            "./libs/codemirror/foldgutter.css"
          ],
          "./resources/styles.css"
        ]
      ],
      "data": {},
      // "directly": true,
      "helper": [ "ccm.load", { "url": "./libs/ccm/helper.js", "type": "module" } ],
      "html": [ "ccm.load", { "url": "./resources/templates.js", "type": "module" } ],
      "libs": [ "ccm.load",
        [
          "./libs/codemirror/codemirror.js",
          [
            "./libs/codemirror/autorefresh.js",
            "./libs/codemirror/brace-fold.js",
            "./libs/codemirror/closebrackets.js",
            "./libs/codemirror/foldcode.js",
            "./libs/codemirror/foldgutter.js",
            "./libs/codemirror/matchbrackets.js"
          ]
        ]
      ],
      "onfinish": { "log": true },
      // "oninput": event => console.log( event ),
      // "onready": event => console.log( event ),
      // "onstart": event => console.log( event ),
      // "preview": true,
      "settings": {
        "autoRefresh": true,
        "autoCloseBrackets": true,
        "autofocus": false,
        "foldGutter": true,
        "gutters": [ "CodeMirror-linenumbers", "CodeMirror-foldgutter" ],
        "lineNumbers": true,
        "lineWrapping": true,
        "matchBrackets": true,
        "tabSize": 2
      },
      "shadow": "open",
      "submit": true,
      "text": [ "ccm.load", { "url": "./resources/resources.js#en", "type": "module" } ]
    },
    Instance: function () {
      let $, data, editor;
      this.init = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );
      };
      this.ready = async () => {
        this.onready && await this.onready( { instance: this } );
      };
      this.start = async () => {
        data = await $.dataset( this.data );
        if ( this.settings.mode?.json && !data.input )
          data = { input: JSON.stringify( data, null, this.settings.tabSize ) };
        this.html.render( this.html.main( this ), this.element );
        this.element.querySelector( 'textarea' ).innerHTML = data.input || '';
        $.remove( this.element.querySelector( '.CodeMirror' ) );
        editor = CodeMirror.fromTextArea( this.element.querySelector( 'textarea' ), this.settings );
        editor.setCursor( editor.lineCount(), 0 );
        editor.on( 'change', this.events.onInput );
        preview();
        this.onstart && await this.onstart( { instance: this, editor } );
      };
      this.events = {
        onInput: () => {
          const value = editor.getValue();
          if ( this.settings.mode?.json ) {
            let valid;
            try {
              $.parse( value );
              valid = true;
              data.input = value;
            } catch ( e ) {}
            this.element.querySelector( 'button' ).disabled = !valid;
            this.element.querySelector( '.CodeMirror' ).classList[ valid ? 'remove' : 'add' ]( 'invalid' );
          }
          else
            data.input = value;
          this.oninput && this.oninput( { instance: this, editor } );
        },
        onSubmit: () => {
          preview();
          $.onFinish( this );
        }
      };
      this.getValue = () => {
        let value = data.input;
        if ( this.directly ) {
          switch ( this.settings.mode ) {
            case 'htmlmixed':
              value = data.input ? fragment( data.input ) : '';
              break;
            case 'css':
              value = $.html( { tag: 'style', inner: data.input } );
              break;
            case 'javascript':
              value = eval( data.input );
              break;
            default:
              if ( this.settings.mode?.json )
                value = $.parse( data.input );
          }
        }
        return value || '';
      }
      const preview = () => {
        const mode = this.settings.mode;
        if ( !this.directly || !this.preview ) return;
        const $preview = this.element.querySelector( '#preview' );
        const iframe = $.html( { tag: 'iframe', frameBorder: 0, width: '100%', height: '100%' } );
        const value = mode === 'javascript' ? $.html( { tag: 'script', inner: data.input } ) : this.getValue();
        iframe.onload = () => {
          const document = iframe.contentWindow.document;
          mode === 'css' && document.head.appendChild( value );
          mode === 'htmlmixed' && document.head.appendChild( fragment( this.preview ) );
          document.body.appendChild( mode === 'htmlmixed' ? value : fragment( this.preview ) );
          mode === 'javascript' && document.body.appendChild( value );
        };
        $preview.innerHTML = '';
        $preview.appendChild( iframe );
      };
      const fragment = str => document.createRange().createContextualFragment( str );
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();