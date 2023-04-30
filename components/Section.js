export default class Section {
  #items;
  #renderer;
  #container;

  constructor({ items, rendererCallback }, containerSelector) {
    this.#items = items;
    this.#renderer = rendererCallback;
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