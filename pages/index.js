import {initialCards} from '../utils/initialCards.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";


// Константы страницы
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
const popupOverlays = document.querySelectorAll('.popup')
const placesContainer = document.querySelector('.places__list');

// константы блока "Работа с формой профиля"
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const popupUserElement = document.querySelector('.popup_type_edit-profile')
const popupUserFormElement = popupUserElement.querySelector('.form')
const popupUserNameInput = popupUserFormElement.querySelector('.form__input_type_username')
const popupUserJobInput = popupUserFormElement.querySelector('.form__input_type_user-job')
const userNameElement = document.querySelector('.profile__user-name');
const userJobElement = document.querySelector('.profile__user-job');
const userFormValidator = new FormValidator(popupUserFormElement, validationConfig);

// константы блока "Работа с формой карточки места"
const profileAddButtonElement = document.querySelector('.profile__add-button');
const popupMestoElement = document.querySelector('.popup_type_add-mesto');
const popupMestoFormElement = popupMestoElement.querySelector('.form');
const popupMestoNameInput = popupMestoFormElement.querySelector('.form__input_type_mesto-heading');
const popupMestoUrlInput = popupMestoFormElement.querySelector('.form__input_type_mesto-url');
const mestoFormValidator = new FormValidator(popupMestoFormElement, validationConfig);

// Константы блока "Работа с увеличенным изображением Места"
const popupMestoImageElement = document.querySelector('.popup_type_show-mesto');
const popupMestoImageSource = popupMestoImageElement.querySelector('.popup__image-popup');
const popupMestoImageTitle = popupMestoImageElement.querySelector('.popup__heading-popup');


// Универсальные функции вызова и сокрытия попапа
function hidePopupOnEsc(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    hidePopup(popup);
  }
}

export function showPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', hidePopupOnEsc);
}

function hidePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', hidePopupOnEsc);
}

// добавить карточку на страницу
function renderMesto(mestoElement) {
  placesContainer.prepend(mestoElement);
}

// создать карточку
export function renderImagePopup(mestoObj) {
  popupMestoImageSource.src = mestoObj.link;
  popupMestoImageSource.alt = `Фотография ${mestoObj.name}`;
  popupMestoImageTitle.textContent = mestoObj.name;
  showPopup(popupMestoImageElement);
}

function addMesto(mestoObj) {
  const mesto = new Card(
    {
      dataObj: mestoObj,
      handleCardClick: renderImagePopup
    },
    '.template_type_mesto',
  )

  return mesto.make();
}

// добавляет первые карточки при загрузке страницы
function placeInitialDataOnPage(initialMestoList) {
  initialMestoList.forEach((mesto) => {
    renderMesto(addMesto(mesto));
  })
}

// обработка закрытия попапов при клике по оверлею или кнопке закрытия
popupOverlays.forEach((overlay) => overlay.addEventListener(
  'mousedown', (event) => {
  if (event.target.classList.contains('popup_opened')
  || event.target.classList.contains('popup__close-button')) {
    hidePopup(event.target.closest('.popup'));
  }})
);

// обработка формы редактирования профиля
userFormValidator.enableValidation();
profileEditButtonElement.addEventListener('click', function () {
  popupUserNameInput.value = userNameElement.textContent;
  popupUserJobInput.value = userJobElement.textContent;
  userFormValidator.resetValidation();
  showPopup(popupUserElement);
});
popupUserFormElement.addEventListener('submit', function (event) {
  event.preventDefault();
  userNameElement.textContent = popupUserNameInput.value;
  userJobElement.textContent = popupUserJobInput.value;
  hidePopup(popupUserElement);
});

// обработка формы добавления карточки
mestoFormValidator.enableValidation();
profileAddButtonElement.addEventListener('click', () => {
  showPopup(popupMestoElement);
});
popupMestoFormElement.addEventListener('submit', function(event) {
  event.preventDefault();
  const mesto = {
    link: popupMestoUrlInput.value,
    name: popupMestoNameInput.value
  };
  renderMesto(addMesto(mesto));
  popupMestoFormElement.reset();
  mestoFormValidator.resetValidation()
  hidePopup(popupMestoElement);
});

// наполнение страницы шаблонными карточками мест
placeInitialDataOnPage(initialCards);