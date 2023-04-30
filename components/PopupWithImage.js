import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  #popup;
  #imageSource;
  #imageTitle;

  constructor(popupSelector) {
    super(popupSelector);
    this.#imageSource = this.#popup.querySelector('.popup__image-popup');
    this.#imageTitle = this.#popup.querySelector('.popup__heading-popup');
  };

  open({ name, link }) {
    this.#imageSource.src = link;
    this.#imageSource.alt = `Фотография ${name}`;
    this.#imageTitle.textContent = name;
    super.open()
  };
}