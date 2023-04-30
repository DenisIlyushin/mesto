export default class FormValidator {
  #formElement
  #config
  #inputsList
  #submitButton

  constructor(formElement, configObj) {
    this.#formElement = formElement;
    this.#config = configObj;
    this.#inputsList = Array.from(
      this.#formElement.querySelectorAll(this.#config.inputSelector)
    );
    this.#submitButton = this.#formElement
      .querySelector(this.#config.submitButtonSelector);

  }

  #hasInvalidInput() {
    return this.#inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  #enableSubmitButton() {
    this.#submitButton.classList.remove(this.#config.inactiveButtonClass);
    this.#submitButton.removeAttribute('disabled');
  };

  #disableSubmitButton() {
    this.#submitButton.classList.add(this.#config.inactiveButtonClass);
    this.#submitButton.setAttribute('disabled', 'disabled');
  };

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.#disableSubmitButton();
    } else {
      this.#enableSubmitButton();
    }
  };

  #hideInputError(inputElement) {
    const errorElement = this.#formElement
      .querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this.#config.inputErrorClass);
    errorElement.classList.remove(this.#config.errorClass);
    errorElement.textContent = '';
  };

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formElement
      .querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this.#config.inputErrorClass);
    errorElement.classList.add(this.#config.errorClass);
    errorElement.textContent = errorMessage;
  };

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  };

  #setEventListeners() {
    this.#toggleButtonState()
    this.#inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this.#checkInputValidity(input);
        this.#toggleButtonState();
      });
    });
  };

  resetValidation() {
    this.#toggleButtonState();
    this.#inputsList.forEach((inputElement) => {
      this.#hideInputError(inputElement);
    });

  }

  enableValidation() {
    this.#setEventListeners();
  };
}