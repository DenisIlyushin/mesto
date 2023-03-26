function hideInputError(formElement, inputElement, configObj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(configObj.inputErrorClass);
  errorElement.classList.remove(configObj.errorClass);
  errorElement.textContent = '';
};

function showInputError(formElement, inputElement, errorMessage, configObj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(configObj.inputErrorClass);
  errorElement.classList.add(configObj.errorClass);
  errorElement.textContent = errorMessage;
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement, configObj) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(configObj.inactiveButtonClass);
  } else {
      buttonElement.classList.remove(configObj.inactiveButtonClass);
  }
};

function checkInputValidity(formElement, inputElement, configObj) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configObj);
  } else {
    hideInputError(formElement, inputElement, configObj);
  }
};

function setEventListeners(formElement, configObj) {
  const inputList = Array.from(formElement.querySelectorAll(configObj.inputSelector));
  const submitButton = formElement.querySelector(configObj.submitButtonSelector);
  
  toggleButtonState(inputList, submitButton, configObj)
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input, configObj);
      toggleButtonState(inputList, submitButton, configObj);
    });
  });
}

export function enableValidation(configObj) {
  const formList = Array.from(document.querySelectorAll(configObj.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(form, configObj);
  }); 
}