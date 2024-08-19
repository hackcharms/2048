import Controller from "./v2/controller";
import "./style.css";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="score-wrapper">
Score : <span id="score" class="score"></span>
</div>
<div id="248-wrapper" class="grid-wrapper"/>
`;
const element = document.getElementById("248-wrapper");
const scoreElement = document.getElementById("score") || undefined;
const gameBoard = new Controller(element!, 4, scoreElement);

window.controller = gameBoard;
