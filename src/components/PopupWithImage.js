import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  #imageSource;
  #imageTitle;

  constructor(popupSelector) {
    super(popupSelector);
    this.#imageSource = this._popup.querySelector('.popup__image-popup');
    this.#imageTitle = this._popup.querySelector('.popup__heading-popup');
  };

  open({ data }) {
    this.#imageSource.src = data.link;
    this.#imageSource.alt = `Фотография ${data.name}`;
    this.#imageTitle.textContent = data.name;
    super.open()
  };
}