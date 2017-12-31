import {Element as PolymerElement} from "./node_modules/@polymer/polymer/polymer-element.js"

//because reasons
export const html = (strings, ...values) => strings[0]
+ values.map((v, i) => v + strings[i+1]).join(''); 

class PolymerCookbook extends PolymerElement {
  doThing(event) {
    console.log(event.target);
  }
  
  static get template() {
    return html`
      <h1>Polymer Cookbook</h1>
      <slot></slot>
      `;
  }
}

customElements.define('polymer-cookbook', PolymerCookbook);
