/**
 * @module ccm-ui
 * @description Minimal UI utilities for ccmjs (templating + rendering)
 * @author André Kless <andre.kless@web.de>
 * @copyright 2026 André Kless
 * @license MIT
 * @version 1.0.0
 *
 * Features:
 * - Template literal HTML creation
 * - DOM rendering helper
 * - Declarative event binding via `data-on-*`
 * - Automatic integration with `instance.events`
 * - Public bind() helper, also called automatically by render()
 */
const e=new WeakMap,t=new WeakMap;export function raw(t){if("string"!=typeof t)throw new TypeError("raw() expects a string");const n=Object.freeze({});return e.set(n,t),n}export function html(t,...n){const r=document.createElement("template");let o="";const i=new Map;function c(t,n){if("string"==typeof t||"number"==typeof t)return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[e]));if(e.has(t))return e.get(t);if(t instanceof Node){const e=`ccm-node-${n}`;return i.set(e,t),`\x3c!--${e}--\x3e`}return Array.isArray(t)?t.map((e,t)=>c(e,`${n}-${t}`)).join(""):""}t.forEach((e,t)=>{o+=e,t<n.length&&(o+=c(n[t],t))}),r.innerHTML=o.trim();const a=r.content,s=document.createTreeWalker(a,NodeFilter.SHOW_COMMENT),l=[];let f;for(;f=s.nextNode();){const e=f.nodeValue.trim(),t=i.get(e);t&&l.push({node:f,replacement:t})}return l.forEach(({node:e,replacement:t})=>{e.replaceWith(t)}),1===a.childNodes.length?a.firstChild:a}export function render(e,t,n){if(t&&(t.replaceChildren(),null!=e))if("string"!=typeof e)e instanceof Node&&(bind(e,n),t.appendChild(e));else{t.innerHTML=e;for(const e of t.children)bind(e,n)}}export function bind(e,n){if(!e||!n)return;if("function"!=typeof e.querySelectorAll)return;const r=n.events||{};[e,...e.querySelectorAll("*")].forEach(e=>{for(const{eventType:n,listener:r}of t.get(e)||[])e.removeEventListener(n,r);t.delete(e);const n=[];[...e.attributes||[]].forEach(t=>{if(!t.name.startsWith("data-on-"))return;const o=t.name.slice(8),i=t.value,c=e=>r[i]?.(e);e.addEventListener(o,c),n.push({eventType:o,listener:c})}),n.length&&t.set(e,n)})}
//# sourceMappingURL=https://cdn.jsdelivr.net/gh/ccmjs/ccm-ui@v1.0.0/ccm-ui-1.0.0.min.mjs.map