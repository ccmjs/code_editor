/**
 * @overview HTML templates of <i>ccmjs</i>-based web component for a code editor that uses CodeMirror 5.
 * @author André Kless <andre.kless@web.de> 2023
 */

import { html, render } from './../libs/lit/lit.js';
export { render };

export function main( app ) {
  return html`
    <form @submit=${ e => { e.preventDefault(); app.events.onSubmit(); } }>
      <textarea></textarea>
      ${ app.submit ? html`<button>${ app.text.submit }</button>` : '' }
    </form>
  `;
}
