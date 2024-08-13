export default class Tile {
  private value: number;
  private col: number = 0;
  private row: number = 0;
  private element: HTMLElement;
  private tileContainer: HTMLElement;
  constructor(
    tileContainer: HTMLElement,
    value: number = Math.random() >= 0.5 ? 2 : 4
  ) {
    this.value = value;
    this.element = document.createElement("div");
    this.element.classList.add("tile");
    this.element.setAttribute("x-data-value", `${value}`);
    this.tileContainer = tileContainer;
    this.tileContainer.append(this.element);
  }

  set setValue(value: number) {
    this.value = value;
    this.element.style.setProperty("--row", this.value.toString());
    const alpha = 1 - Math.log2(value) / 10;
    this.element.style.setProperty("--bg-alpha", alpha.toString());
    this.element.style.setProperty("--text-alpha", alpha <= 0.5 ? ".9" : ".1");
    this.element.setAttribute("x-data-value", `${value}`);
  }
  set setRow(value: number) {
    this.row = value;
    this.element.style.setProperty("--row", this.row.toString());
  }
  set setCol(value: number) {
    this.col = value;
    this.element.style.setProperty("--col", this.col.toString());
  }
}
