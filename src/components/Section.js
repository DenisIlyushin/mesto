export default class Section {
  #items;
  #container;
  #renderHandler;

  constructor({ items, rendererCallback }, containerSelector) {
    this.#items = items;
    this.#renderHandler = rendererCallback;
    this.#container = document.querySelector(containerSelector);
  };

  renderItems() {
    this.#items.forEach((item) => {
      this.#renderHandler(item)
    });
  };

  addItem(element) {
    this.#container.prepend(element)
  };
}