export default class Section {
  #items;
  #renderer;
  #container;

  constructor({items, renderer}, containerSelector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  };

  renderItems() {
    this.#items.forEach((item) => {
      this.#renderer(item)
    });
  };

  addItem(element) {
    this.#container.prepend(element)
  };
}