export default class FormValidator {
  // Класс валидации формы
  constructor(formElement, configObj) {
    this._formElement = formElement;
    this._config = configObj;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  };

  _disableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }
  };

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  };

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _setEventListeners(formElement) {
    const inputsList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const submitButton = formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(inputsList, submitButton)
    inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(formElement, input);
        this._toggleButtonState(inputsList, submitButton);
      });
    });
    formElement.addEventListener('reset', () => {
      this._disableSubmitButton(submitButton);
    });
  };

  enableValidation() {
    this._setEventListeners(this._formElement);
  };
}