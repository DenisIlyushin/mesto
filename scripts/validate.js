// Управление состоянием кнопки сабимита формы
// Проверка валидности полей
import FormValidator from "./FormValidator.js";

// Общая функция включения валидации форм на страницах
export default function enableValidation(configObj) {
  const formsList = Array.from(document.querySelectorAll(configObj.formSelector));

  formsList.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    const formValidator = new FormValidator(form, configObj)

    formValidator.enableValidation();
  }); 
};