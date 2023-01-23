import{html,render}from"https://ccmjs.github.io/libs/lit/lit.min.js";export{render};export function main(app){return html`
    <form @submit=${e=>{e.preventDefault();app.events.onSubmit()}}>
      <div>
        <textarea></textarea>
        ${app.directly&&app.preview&&app.settings.mode==="htmlmixed"?html`<div id="preview"></div>`:""}
      </div>
      ${app.submit?html`<button>${app.text.submit}</button>`:""}
    </form>
  `}
//# sourceMappingURL=templates.min.mjs.map