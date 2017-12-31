import {Element as PolymerElement} from "https://unpkg.com/@polymer/polymer@3.0.0-pre.1/polymer-element.js"

class TestThing extends PolymerElement {
  
  ready() {
    super.ready();
    console.log("Hi from test-thing.js, a js module with script type = module is working");
  }

  static get template() {
    return `
      <p>i am test-thing.js, a custom element</p>
    `;
  }
}

customElements.define('test-thing', TestThing);