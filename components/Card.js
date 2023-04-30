export default class Card {
  #data
  #element
  #innerElements
  #handlePopup

  constructor({ dataObj, handleCardClick }, templateSelector) {
    this.#data = {
      name: dataObj.name,
      link: dataObj.link
    };
    this.#element = this.#getTemplateElement(templateSelector);
    this.#innerElements = {
      image: this.#element.querySelector('.mesto__image'),
      title: this.#element.querySelector('.mesto__heading'),
      likeButton: this.#element.querySelector('.mesto__like-button'),
      deleteButton: this.#element.querySelector('.mesto__delete-button'),
    };
    this.#handlePopup = handleCardClick;
  };

  #getTemplateElement(templateSelector) {
    // возвращает готовый элемент по шаблону
    return document
      .querySelector(templateSelector)
      .content
      .querySelector('.mesto')
      .cloneNode(true);
  };

  #openInPopup() {
    this.#handlePopup(this.#data);
  };

  #toggleLike() {
    // управляет статусом кнопки лайка
    this.#innerElements.likeButton
      .classList.toggle("mesto__like-button_liked");
  }

  #delete() {
    // удаляет карточку места
    this.#element.remove();
    this.#innerElements = null;
  };

  #setEventsListeners() {
    // добавляет слушателей события к карточке
    this.#innerElements.likeButton
      .addEventListener('click', () => {this.#toggleLike()});
    this.#innerElements.deleteButton
      .addEventListener('click', () => {this.#delete()});
    this.#innerElements.image
      .addEventListener('click', () => {this.#openInPopup()});
  }

  make() {
    // возвращает готовый элемент карточки места
    this.#innerElements.image.src = this.#data.link;
    this.#innerElements.image.alt = `Фотография ${this.#data.name}`;
    this.#innerElements.title.textContent = this.#data.name;
    this.#setEventsListeners();

    return this.#element
  }
}