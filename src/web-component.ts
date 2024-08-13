import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter, bindInputChange } from "./counter.ts";
import FormInput from "./components/form/input.ts"
import Grid from './grid.ts';
import { Controller } from './controller.ts';
import { Game2048 } from './2048.ts';
import { Game2048Table } from './2048Table.ts';
import { Game2048Grid } from './2048Grid.ts';
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
        <div class="grid-wrapper">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="tile" style="--row:0;--col:0;"></div>
          <div class="tile" style="--row:0;--col:1;"></div>
          <div class="tile" style="--row:0;--col:2;"></div>
          <div class="tile" style="--row:0;--col:3;"></div>
          <div class="tile" style="--row:1;--col:0;"></div>
          <div class="tile" style="--row:1;--col:1;"></div>
          <div class="tile" style="--row:1;--col:2;"></div>
          <div class="tile" style="--row:1;--col:3;"></div>
          <div class="tile" style="--row:2;--col:0;"></div>
          <div class="tile" style="--row:2;--col:1;"></div>
          <div class="tile" style="--row:2;--col:2;"></div>
          <div class="tile" style="--row:2;--col:3;"></div>
          <div class="tile" style="--row:3;--col:0;"></div>
          <div class="tile" style="--row:3;--col:1;"></div>
          <div class="tile" style="--row:3;--col:2;"></div>
          <div class="tile" style="--row:3;--col:3;"></div>
        </div>
    </div>
  </div>
`;

/**
 * 
 <div class="tile" style="--row:0;--col:0;">2</div>
            <div class="tile" style="--row:0;--col:1;">2</div>
            <div class="tile" style="--row:0;--col:2;">2</div>
            <div class="tile" style="--row:0;--col:3;">2</div>
            <div class="tile" style="--row:1;--col:0;">2</div>
            <div class="tile" style="--row:1;--col:1;">2</div>
            <div class="tile" style="--row:1;--col:2;">2</div>
            <div class="tile" style="--row:1;--col:3;">2</div>
            <div class="tile" style="--row:2;--col:0;">2</div>
            <div class="tile" style="--row:2;--col:1;">2</div>
            <div class="tile" style="--row:2;--col:2;">2</div>
            <div class="tile" style="--row:2;--col:3;">2</div>
            <div class="tile" style="--row:3;--col:0;">2</div>
            <div class="tile" style="--row:3;--col:1;">2</div>
            <div class="tile" style="--row:3;--col:2;">2</div>
            <div class="tile" style="--row:3;--col:3;">2</div>
 * 
 */
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
window.customElements.define("form-input", FormInput);
bindInputChange(document.querySelector<HTMLButtonElement>("#handleInput")!);
const element=document.getElementById('grid');
const game=new Game2048Grid();
game.resetGridValues(element)
game.attachEventListener();
// game.attachElement(element!);
// window.ctrl=game;
// if(element){
//   const gridLayout=Grid.slides(4).render(element);
//   console.log(controller.emptyCells(),controller.element)
//   controller.fillRandomTile(2)
//   gridLayout.wrapper
// }else{
//   console.log('grid element not found')
// }