/**
 * @overview HTML templates of <i>ccmjs</i>-based web component for a code editor that uses CodeMirror 5.
 * @author André Kless <andre.kless@web.de> 2023
 * @license The MIT License (MIT)
 * @version latest (v1)
 */

import { html, render } from 'https://ccmjs.github.io/libs/lit/lit.min.js';
export { render };

export function main( app ) {
  return html`
    <form @submit=${ e => { e.preventDefault(); app.events.onSubmit(); } }>
      <div>
        <textarea></textarea>
        ${ app.directly && app.preview ? html`<div id="preview"></div>` : '' }
      </div>
      ${ app.submit ? html`<button>${ app.text.submit }</button>` : '' }
    </form>
  `;
}
