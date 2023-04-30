import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  #submitHandler
  #form
  #inputs
  #data = {} // todo не уверен в синтаксисе, по наитию

  constructor({ formSubmitCallback }, popupSelector) {
    super(popupSelector);
    this.#submitHandler = formSubmitCallback;
    this.#form = document.querySelector('.form');
    this.#inputs = this.#form.querySelectorAll('.form__input');
  };

  #getInputValues() { // todo подозрительно не используется пока
    this.#inputs.forEach((input) => {
      this.#data[input.name] = input.value;
    });
    return this.#data;
  };

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', () => {
      this.#submitHandler(); // todo вероятно потребуется аргумент
    });
  };

  close() {
    super.close();
    this.#form.reset();
  };
}