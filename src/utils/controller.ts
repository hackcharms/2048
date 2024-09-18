import Cell from "./cell";
import Grid from "./grid";
import Tile from "./tile";

export default class Controller {
  static ARROW_UP = "ArrowUp";
  static ARROW_DOWN = "ArrowDown";
  static ARROW_RIGHT = "ArrowRight";
  static ARROW_LEFT = "ArrowLeft";
  private grid: Grid;
  private element: HTMLElement;
  private scoreElement: HTMLElement;
  private score: number = 0;

  constructor(
    element: HTMLElement,
    gridSize: number = 4,
    scoreElement?: HTMLElement
  ) {
    this.element = element;
    if (!scoreElement) {
      scoreElement = document.createElement("h1");
      scoreElement.innerText = "Score: ";
      this.scoreElement = document.createElement("span");
      scoreElement.append(this.scoreElement);
      this.element.parentElement?.prepend(scoreElement);
    } else {
      this.scoreElement = scoreElement;
    }
    this.scoreElement.innerText = this.score.toString();
    this.grid = new Grid(this.element, gridSize);
    this.attachEventListener();
    this.generateRandomTiles(2);
  }

  attachEventListener() {
    window.addEventListener("keyup", this.inputHandler.bind(this), {
      once: true,
    });
  }
  generateRandomTiles(count = 1) {
    for (let i = 0; i < count; i++) {
      const tile = this.grid.getRandomEmptyCells;
      tile.setTile = new Tile(this.element);
    }
  }
  set setScore(value: number) {
    this.score = value;
    this.scoreElement.innerText = this.score?.toString();
  }
  get getScore() {
    return this.score;
  }

  async inputHandler(event: KeyboardEvent) {
    if (event.key && ![Controller.ARROW_DOWN, Controller.ARROW_UP, Controller.ARROW_LEFT, Controller.ARROW_RIGHT].includes(event.key)) {
      return this.attachEventListener();
    }
    if (event.key === Controller.ARROW_UP) {
      await this.slideUp();
    }
    if (event.key === Controller.ARROW_DOWN) {
      await this.slideDown();
    }
    if (event.key === Controller.ARROW_RIGHT) {
      await this.slideRight();
    }
    if (event.key === Controller.ARROW_LEFT) {
      await this.slideLeft();
    }
    this.grid.getCells.forEach((cell) => {
      this.setScore = this.getScore + (cell.mergeTiles() || 0);
    });
    const newTile = new Tile(this.element);
    this.grid.getRandomEmptyCells.setTile = newTile;
    if (
      !this.canMoveUp() &&
      !this.canMoveDown() &&
      !this.canMoveLeft() &&
      !this.canMoveRight()
    ) {
      newTile.waitForTransition(true).then(() => {
        alert("You lose");
      });
      return;
    }
    this.attachEventListener();
  }
  slideUp() {
    if (!this.canMoveUp()) return;
    return this.slideTiles(this.grid.cellsByCols);
  }
  slideDown() {
    if (!this.canMoveDown()) return;
    return this.slideTiles(
      this.grid.cellsByCols.map((row) => [...row].reverse())
    );
  }
  slideLeft() {
    if (!this.canMoveLeft()) return;
    this.slideTiles(this.grid.cellsByRows);
  }
  slideRight() {
    if (!this.canMoveRight()) return;
    this.slideTiles(this.grid.cellsByRows.map((row) => [...row].reverse()));
  }
  slideTiles(cells: Cell[][]) {
    return Promise.all(
      cells.flatMap((group) => {
        const promises = [];
        for (let i = 1; i < group.length; i++) {
          const cell = group[i];
          if (cell.getTile == null) continue;
          let lastValidCell: Cell | undefined;
          for (let j = i - 1; j >= 0; j--) {
            const moveToCell = group[j];
            if (!moveToCell.canCombine(cell.getTile)) break;
            lastValidCell = moveToCell;
          }

          if (lastValidCell) {
            promises.push(cell.getTile.waitForTransition());
            if (lastValidCell.getTile != null) {
              lastValidCell.setMergeTile = cell.getTile;
            } else {
              lastValidCell.setTile = cell.getTile;
            }
            cell.setTile = undefined;
          }
        }
        return promises;
      })
    );
  }

  canMoveUp() {
    return this.canMove(this.grid.cellsByCols);
  }

  canMoveDown() {
    return this.canMove(
      this.grid.cellsByCols.map((column) => [...column].reverse())
    );
  }

  canMoveLeft() {
    return this.canMove(this.grid.cellsByRows);
  }

  canMoveRight() {
    return this.canMove(this.grid.cellsByRows.map((row) => [...row].reverse()));
  }

  canMove(cells: Cell[][]) {
    return cells.some((group) => {
      return group.some((cell, index) => {
        if (index === 0) return false;
        if (cell.getTile == null) return false;
        const moveToCell = group[index - 1];
        return moveToCell.canCombine(cell.getTile);
      });
    });
  }
}
