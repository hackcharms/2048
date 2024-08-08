import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter, bindInputChange } from "./counter.ts";
import FormInput from "./components/form/input.ts"
import Grid from './grid.ts';
import { Controller } from './controller.ts';
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <div>
    <form-input name="zubair" type="text" value="12" input-class="parent-class" id="handleInput2" prepend-text="INR" append-text="only"></form-input>
    <form-input name="zubair" type="text" value="12" input-class="parent-class" id="handleInput" prepend-text="INR" append-text="only"></form-input>
  </div>
    <div id="grid">
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
window.customElements.define("form-input", FormInput);
bindInputChange(document.querySelector<HTMLButtonElement>("#handleInput")!);
const element=document.getElementById('grid');
if(element){
  const gridLayout=Grid.slides(4).render(element);
  const controller=new Controller(gridLayout.wrapper);
  window.ctrl=controller;
  console.log(controller.emptyCells(),controller.element)
  controller.fillRandomTile(2)
  gridLayout.wrapper
}else{
  console.log('grid element not found')
}