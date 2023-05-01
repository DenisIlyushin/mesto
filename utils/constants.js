export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const indexPageSelectors = {
  placesContainer: '.places__list',
  popupUser: '.popup_type_edit-profile',
  popupMesto: '.popup_type_add-mesto',
  userName: '.profile__user-name',
  userJob: '.profile__user-job'
}

const popupUserElement = document.querySelector('.popup_type_edit-profile')
export const popupUserFormElement = popupUserElement.querySelector('.form');
export const profileEditButtonElement = document.querySelector('.profile__edit-button');
// const popupUserNameInput = popupUserFormElement.querySelector('.form__input_type_username')
// const popupUserJobInput = popupUserFormElement.querySelector('.form__input_type_user-job')
