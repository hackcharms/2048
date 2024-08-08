export default class MyInput extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log("Custom element added to page.");
    const shadow = this.attachShadow({ mode: "open" });
    const input=document.createElement('input');
    input.setAttribute('name',this.getAttribute('name')||'zubair')
    input.setAttribute('class','base')

    const style = document.createElement("style");
    style.textContent = `
      :root{
        --font-size:15px;
      }
      .base{
        width: 100%;
        border:none;
        flex:1 1;
        padding: 6px;
        display: inline-block;
        box-sizing: border-box;
        font-size:var(--font-size);
      }
      .wrapper{
        display:flex;
        gap:1px;
        border:1px solid white;
        border-radius:6px;
        font-size:var(--font-size);
      }
      .append-text, .prepend-text{
        align-self: center;
        padding: 6px;
        font-size:var(--font-size);
      }
    `;
     shadow.appendChild(style);
    const wrapper=document.createElement('div');
    wrapper.classList.add('wrapper');
    const externalStyle=this.getAttribute('style-sheet');
    if(externalStyle){
      const linkElem = document.createElement("link");
      linkElem.setAttribute("rel", "stylesheet");
      linkElem.setAttribute("href", externalStyle);
      shadow.appendChild(linkElem)
    }

    const hasPrependText = this.getAttribute("prepend-text");
    if (hasPrependText) {
      const prependText = document.createElement("span");
      prependText.classList.add('prepend-text')
      prependText.innerText = hasPrependText;
      wrapper.appendChild(prependText);
    }
    wrapper.appendChild(input);
    const hasAppendText = this.getAttribute("append-text");
    if (hasAppendText) {
      const appendText = document.createElement("span");
      appendText.classList.add("append-text");
      appendText.innerText = hasAppendText;
      wrapper.appendChild(appendText);
    }
    shadow.appendChild(wrapper);
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name:string, oldValue:any, newValue:any) {
    console.log(`Attribute ${name} has changed.`,oldValue,newValue);
  }
}