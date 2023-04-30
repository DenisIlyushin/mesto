import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  #popup;
  #imageSource;
  #imageTitle;

  constructor(popupSelector) {
    super(popupSelector);
    this.#imageSource = this.#popup.querySelector('.popup__image-popup');
    this.#imageTitle = this.#popup.querySelector('.popup__heading-popup');
  };

  open(mestoObj) {
    this.#imageSource.src = mestoObj.link;
    this.#imageSource.alt = `Фотография ${mestoObj.name}`;
    this.#imageTitle.textContent = mestoObj.name;
    super.open()
  };
}