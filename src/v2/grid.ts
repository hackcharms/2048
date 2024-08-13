import Cell from "./cell";

export default class Grid {
  private WRAPPER_SIZE = 600;
  private SPACING = 8;
  private GRID_SIZE = 4;
  private BORDER_RADIUS = 4;
  // private CELL_SIZE=40;
  private cells: Cell[] = [];
  private wrapperElement: HTMLElement;

  constructor(wrapperElement: HTMLElement, size: number) {
    this.wrapperElement = wrapperElement;
    this.GRID_SIZE = size;
    this.wrapperElement.style.setProperty(
      "--wrapper-size",
      `${this.WRAPPER_SIZE}px`
    );
    this.wrapperElement.style.setProperty("--spacing", `${this.SPACING}px`);
    this.wrapperElement.style.setProperty("--grid-size", `${this.GRID_SIZE}`);
    this.wrapperElement.style.setProperty(
      "--border-radius",
      `${this.BORDER_RADIUS}px`
    );
    const cellSize = this.WRAPPER_SIZE / this.GRID_SIZE - this.SPACING;
    this.wrapperElement.style.setProperty("--cell-size", `${cellSize}px`);
    this.wrapperElement.style.setProperty("--bg-alpha", `1`);
    this.wrapperElement.style.setProperty("--text-alpha", `1`);
    this.cells = createGridElement(wrapperElement, this.GRID_SIZE).map(
      (cellElement, index) => {
        return new Cell(
          cellElement,
          index % this.GRID_SIZE,
          Math.floor(index / this.GRID_SIZE)
        );
      }
    );
  }
  get getCells() {
    return this.cells;
  }
  get getEmptyCells() {
    return this.cells.filter((cell) => !cell.getTile);
  }
  get getRandomEmptyCells() {
    const emptyCells = this.getEmptyCells;
    return emptyCells[(Math.random() * emptyCells.length) | 0];
  }

  get cellsByRow() {
    return this.cells.reduce((cellGrid: Cell[][], cell) => {
      cellGrid[cell.getCol] = cellGrid[cell.getCol] || [];
      cellGrid[cell.getCol][cell.getRow] = cell;
      return cellGrid;
    }, []);
  }
  get cellsByCols() {
    return this.cells.reduce((cellGrid: Cell[][], cell) => {
      cellGrid[cell.getRow] = cellGrid[cell.getRow] || [];
      cellGrid[cell.getRow][cell.getCol] = cell;
      return cellGrid;
    }, []);
  }
}

function createGridElement(gridElement: HTMLElement, size: number) {
  return Array(size * size)
    .fill(0)
    .map(() => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gridElement.append(cell);
      return cell;
    });
}
