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

  constructor(element: HTMLElement, gridSize: number = 4) {
    this.element = element;
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
      console.log("tile", tile);
    }
  }

  inputHandler(event: KeyboardEvent) {
    if (event.key === Controller.ARROW_UP) {
      this.slideUp();
    }
    if (event.key === Controller.ARROW_DOWN) {
      this.slideDown();
    }
    if (event.key === Controller.ARROW_RIGHT) {
      this.slideRight();
    }
    if (event.key === Controller.ARROW_LEFT) {
      this.slideLeft();
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
