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
    this.#element = this._getTemplateElement(templateSelector);
    this.#innerElements = {
      image: this.#element.querySelector('.mesto__image'),
      title: this.#element.querySelector('.mesto__heading'),
      likeButton: this.#element.querySelector('.mesto__like-button'),
      deleteButton: this.#element.querySelector('.mesto__delete-button'),
    };
    this.#handlePopup = handleCardClick;
  };

  _getTemplateElement(templateSelector) {
    // возвращает готовый элемент по шаблону
    return document
      .querySelector(templateSelector)
      .content
      .querySelector('.mesto')
      .cloneNode(true);
  };

  _openInPopup() {
    this.#handlePopup(this.#data);
  };

  _toggleLike() {
    // управляет статусом кнопки лайка
    this.#innerElements.likeButton
      .classList.toggle("mesto__like-button_liked");
  }

  _delete() {
    // удаляет карточку места
    this.#element.remove();
    this.#innerElements = null;
  };

  _setEventsListeners() {
    // добавляет слушателей события к карточке
    this.#innerElements.likeButton
      .addEventListener('click', () => {this._toggleLike()});
    this.#innerElements.deleteButton
      .addEventListener('click', () => {this._delete()});
    this.#innerElements.image
      .addEventListener('click', () => {this._openInPopup()});
  }

  make() {
    // возвращает готовый элемент карточки места
    this.#innerElements.image.src = this.#data.link;
    this.#innerElements.image.alt = `Фотография ${this.#data.name}`;
    this.#innerElements.title.textContent = this.#data.name;
    this._setEventsListeners();

    return this.#element
  }
}