import "./style.css";
import Grid from "./v2/grid";
import Tile from "./v2/tile";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div id="248-wrapper" class="grid-wrapper"/>
`;
const element = document.getElementById("248-wrapper");
const gameBoard = new Grid(element!, 4);
console.log("gameBoard", gameBoard.cellsByRow, gameBoard.getCells);
gameBoard.getRandomEmptyCells.setTile = new Tile(element!);
gameBoard.getRandomEmptyCells.setTile = new Tile(element!);
// console.log("randomCell", randomCell);

window.ctrl = gameBoard;
