import FormValidator from "./FormValidator.js";

// Общая функция включения валидации форм на страницах
export default function enableValidation(configObj) {
  const formsList = Array.from(document.querySelectorAll(configObj.formSelector));

  formsList.forEach((form) => {
    const formValidator = new FormValidator(form, configObj)

    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    formValidator.enableValidation();
  }); 
};