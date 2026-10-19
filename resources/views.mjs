/** CodeMirror owns the mount's children; never rerender this shell on input. */
export function main(app) {
  return app.ui.html`
    <section class="code-editor">
      ${app.label && app.ui.html`<div class="code-editor-label">${app.label}</div>`}
      <div class="code-editor-mount"></div>
    </section>
  `;
}
