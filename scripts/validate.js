// Управление состоянием кнопки сабимита формы
// Проверка валидности полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
};

function enableSubmitButton(buttonElement, configObj) {
  buttonElement.classList.remove(configObj.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'disabled');
};

function disableSubmitButton(buttonElement, configObj) {
  buttonElement.classList.add(configObj.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
};

function toggleButtonState(inputList, buttonElement, configObj) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, configObj);
  } else {
    enableSubmitButton(buttonElement, configObj);
  }
};

// Управление состоянием полей ввода
// Показывает ошибку ввода
function hideInputError(formElement, inputElement, configObj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(configObj.inputErrorClass);
  errorElement.classList.remove(configObj.errorClass);
  errorElement.textContent = '';
};

// Скрывает ошибку ввода
function showInputError(formElement, inputElement, errorMessage, configObj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(configObj.inputErrorClass);
  errorElement.classList.add(configObj.errorClass);
  errorElement.textContent = errorMessage;
};

// Проверка валидности данных в отдельном поле форы
function checkInputValidity(formElement, inputElement, configObj) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configObj);
  } else {
    hideInputError(formElement, inputElement, configObj);
  }
};

// Добавление слушателей события `input` на поля формы и кнопку
function setEventListeners(formElement, configObj) {
  const inputsList = Array.from(formElement.querySelectorAll(configObj.inputSelector));
  const submitButton = formElement.querySelector(configObj.submitButtonSelector);
  
  toggleButtonState(inputsList, submitButton, configObj)
  inputsList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input, configObj);
      toggleButtonState(inputsList, submitButton, configObj);
    });
  });
  formElement.addEventListener('reset', () => {
    disableSubmitButton(submitButton, configObj)
  });
};

// Общая функция включения валидации форм на страницах
export function enableValidation(configObj) {
  const formsList = Array.from(document.querySelectorAll(configObj.formSelector));

  formsList.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(form, configObj);
  }); 
};