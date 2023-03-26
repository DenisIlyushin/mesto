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
      buttonElement.setAttribute('disabled', 'disabled');
  } else {
      buttonElement.classList.remove(configObj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled')
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
  const inputsList = Array.from(formElement.querySelectorAll(configObj.inputSelector));
  const submitButton = formElement.querySelector(configObj.submitButtonSelector);
  
  toggleButtonState(inputsList, submitButton, configObj)
  inputsList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input, configObj);
      toggleButtonState(inputsList, submitButton, configObj);
    });
  });
}

export function enableValidation(configObj) {
  const formsList = Array.from(document.querySelectorAll(configObj.formSelector));

  formsList.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(form, configObj);
  }); 
}