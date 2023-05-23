import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  #submitHandler
  #form
  #inputs
  #submitButton
  #submitButtonMessage

  constructor({ formSubmitCallback }, popupSelector) {
    super(popupSelector);
    this.#submitHandler = formSubmitCallback;
    this.#form = this._popup.querySelector('.form');
    this.#inputs = this.#form.querySelectorAll('.form__input');
    this.#submitButton = this.#form.querySelector('.form__submit-button')
    this.#submitButtonMessage = this.#submitButton.textContent
  };

  #getInputValues() {
    const data = {};
    this.#inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  };

  setInputValues({ data }) {
    this.#inputs.forEach((input) => {
      if (input.name in data) {
        input.value = data[input.name];
      } else {
        input.value = null;
      }
    });
  };

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

  loading(isLoading, message = 'Сохранение...') {
    if (isLoading) {
      this.#submitButton.classList.add('.form__submit-button_in-progress')
      this.#submitButton.textContent = message
      return
    }
    this.#submitButton.classList.remove('.form__submit-button_in-progress')
    this.#submitButton.textContent = this.#submitButtonMessage
  };
}