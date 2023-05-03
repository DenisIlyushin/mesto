export default class Section {
  #container;
  #renderHandler;

  constructor({ rendererCallback }, containerSelector) {
    this.#renderHandler = rendererCallback;
    this.#container = document.querySelector(containerSelector);
  };

  renderItems(items) {
    items.forEach((item) => {
      this.#renderHandler(item)
    });
  };

  addItem(element) {
    this.#container.prepend(element)
  };
}