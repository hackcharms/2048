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
    this.setValue = value;
    this.tileContainer = tileContainer;
    this.tileContainer.append(this.element);
  }

  get getValue() {
    return this.value;
  }
  waitForTransition() {}
  set setValue(value: number) {
    this.value = value;
    // This needs to be improved
    const alpha = 20 + Math.log2(value) * 8;
    this.element.style.setProperty("--bg-alpha", `${alpha}%`);
    // this.element.style.setProperty("--bg-alpha", `${alpha}%`);
    this.element.style.setProperty("--text-alpha", alpha <= 50 ? "50%" : "90%");
    this.element.setAttribute("x-data-value", `${this.value}`);
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
