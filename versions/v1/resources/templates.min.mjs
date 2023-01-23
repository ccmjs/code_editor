import{html,render}from"https://ccmjs.github.io/libs/lit/lit.min.js";export{render};export function main(app){return html`
    <form @submit=${e=>{e.preventDefault();app.events.onSubmit()}}>
      <textarea></textarea>
      ${app.submit?html`<button>${app.text.submit}</button>`:""}
    </form>
  `}
//# sourceMappingURL=templates.min.mjs.map