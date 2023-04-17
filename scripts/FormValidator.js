export default class FormValidator {
  // Класс валидации формы
  constructor(formElement, configObj) {
    this._formElement = formElement;
    this._config = configObj;
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);

  }

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  };

  _disableSubmitButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', 'disabled');
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._toggleButtonState()
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

  }

  enableValidation() {
    this._setEventListeners();
  };
}