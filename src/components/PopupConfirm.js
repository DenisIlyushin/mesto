import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  #cardID
  #form
  #submitButton
  #handleSubmit

  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.#form = this._popup.querySelector('.form');
    this.#submitButton = this.#form.querySelector('.form__submit-button')
    this.#handleSubmit = submitCallback;
  };

  open(cardID) {
    this.#cardID = cardID;
    super.open()
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#handleSubmit(this.#cardID)
    })
  }
}