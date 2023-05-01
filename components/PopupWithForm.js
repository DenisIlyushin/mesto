import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  #submitHandler
  #form
  #inputs
  #data = {}

  constructor({ formSubmitCallback }, popupSelector) {
    super(popupSelector);
    this.#submitHandler = formSubmitCallback;
    this.#form = this._popup.querySelector('.form');
    this.#inputs = this.#form.querySelectorAll('.form__input');
  };

  #getInputValues() {
    this.#inputs.forEach((input) => {
      this.#data[input.name] = input.value;
    });
    return this.#data;
  };

  setInputValues({ data }) {
    this.#inputs.forEach((input) => {
      if (input.name in data) {
        input.value = data[input.name];
      } else {
        input.value = null;
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#submitHandler(this.#getInputValues());
    });
  };

  close() {
    super.close();
    this.#form.reset();
  };
}