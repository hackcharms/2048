import Tile from "./tile";

export default class Cell {
  private tile?: Tile;
  private mergeTile?: Tile;
  constructor(
    private element: HTMLElement,
    private row: number,
    private col: number
  ) {}
  get getRow() {
    return this.row;
  }
  get getCol() {
    return this.col;
  }
  get getTile() {
    return this.tile;
  }
  set setTile(tile: Tile | undefined) {
    this.tile = tile;
    if (!this.tile) return;
    this.tile.setCol = this.col;
    this.tile.setRow = this.row;
  }

  get getMergeTile() {
    return this.mergeTile;
  }

  canCombine(tile: Tile) {
    return (
      !this.tile ||
      (this.mergeTile == null && this.tile.getValue === tile.getValue)
    );
  }
  set setMergeTile(value: Tile) {
    this.mergeTile = value;
    if (value == null) return;
    this.mergeTile.setCol = this.col;
    this.mergeTile.setRow = this.row;
  }
}
