import { renderImagePopup } from "./index.js";

export default class Card {
//   Класс карточки места

  constructor(dataObj, templateSelector, popupFunction) {
    this._data = {
      name: dataObj.name,
      link: dataObj.link
    };
    this._mestoElement = this._getTemplateElement(templateSelector);
    this._elements = {
      image: this._mestoElement.querySelector('.mesto__image'),
      title: this._mestoElement.querySelector('.mesto__heading'),
      likeButton: this._mestoElement.querySelector('.mesto__like-button'),
      deleteButton: this._mestoElement.querySelector('.mesto__delete-button'),
    };
    this._popupFunction = popupFunction || renderImagePopup;
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
    this._popupFunction(this._data);
  };

  _toggleLike() {
    // управляет статусом кнопки лайка
    this._elements.likeButton
      .classList.toggle("mesto__like-button_liked");
  }

  _delete() {
    // удаляет карточку места
    this._mestoElement.remove();
    this._elements = null;
  };

  _setEventsListeners() {
    // добавляет слушателей события к карточке
    this._elements.likeButton
      .addEventListener('click', () => {this._toggleLike()});
    this._elements.deleteButton
      .addEventListener('click', () => {this._delete()});
    this._elements.image
      .addEventListener('click', () => {this._openInPopup()});
  }

  make() {
    // возвращает готовый элемент карточки места
    this._elements.image.src = this._data.link;
    this._elements.image.alt = `Фотография ${this._data.name}`;
    this._elements.title.textContent = this._data.name;
    this._setEventsListeners();
    return this._mestoElement
  }
}