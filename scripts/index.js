import { INITIAL_CARDS } from './cards.js';
import { enableValidation } from './validate.js';

// Константы страницы
const VALIDATION_CONFIG = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
const popupsCloseButtonElement = document.querySelectorAll('.popup__close-button');
const popupOverlays = document.querySelectorAll('.popup')

// константы блока "Работа с формой профиля"
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const popupUserElement = document.querySelector('#editProfile');
const popupUserFormElement = document.forms.popupEditProfileInfo;
const popupUserNameInput = popupUserFormElement.userName;
const popupUserJobInput = popupUserFormElement.userJob;
const userNameElement = document.querySelector('.profile__user-name');
const userJobElement = document.querySelector('.profile__user-job');

// константы блока "Работа с формой карточки места"
const profileAddButtonElement = document.querySelector('.profile__add-button');
const popupMestoElement = document.querySelector('#addMesto');
const popupMestoFormElement = document.forms.popupAddMesto;
const popupMestoNameInput = popupMestoFormElement.mestoName;
const popupMestoUrlInput = popupMestoFormElement.mestoUrl;

// Константы блока "Работа с увеличенным изображением Места"
const popupMestoImageElement = document.querySelector('#mestoPopup');
const popupMestoImageSource = popupMestoImageElement.querySelector('.popup__image-popup');
const popupMestoImageTitle = popupMestoImageElement.querySelector('.popup__heading-popup');

// Первоначальная начинка страница по темплейту
const placesContainer = document.querySelector('.places__list');
const mestoTemplate = document.querySelector('#mesto').content.querySelector('.mesto');


// Универсальные функции вызова и сокрытия попапа
function hidePopupOnEsc(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    hidePopup(popup);
  }
}

function showPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', hidePopupOnEsc);
}

function hidePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', hidePopupOnEsc);
}

// добавить карточку на страницу
function renderMesto(mestoObj) {
  placesContainer.prepend(mestoObj);
}

// создать карточку
function addMesto(mestoObj) {
  const mesto = mestoTemplate.cloneNode(true);
  const mestoImage = mesto.querySelector('.mesto__image');
  const mestoTitle = mesto.querySelector('.mesto__heading');

  mestoImage.src = mestoObj.link;
  mestoImage.alt = `Фотография ${mestoObj.name}`;
  mestoTitle.textContent = mestoObj.name;
  // добавляет слушателя на кнопку лайка
  mesto.querySelector('.mesto__like-button').addEventListener(
    "click", (event) => {
      event.target.classList.toggle("mesto__like-button_liked");
    });
  // добавляет слушателя на кнопку удаления карточки
  mesto.querySelector('.mesto__delete-button').addEventListener(
    "click", (event) => {
      event.target.parentElement.remove();
    });
  // добавляет слушателя на фотографию места
  mestoImage.addEventListener('click', function () {
    popupMestoImageSource.src = mestoObj.link;
    popupMestoImageSource.alt = `Фотография ${mestoObj.name}`;
    popupMestoImageTitle.textContent = mestoObj.name;
    showPopup(popupMestoImageElement);
  });
  return mesto;
}

// добавляет первые карточки при загрузке страницы
function placeInitialDataOnPage(initialMestoList) {
  const places = initialMestoList.map((mesto) => {
    renderMesto(addMesto(mesto));
  });
}

// обработка закрытия всех попапов
popupsCloseButtonElement.forEach((button) => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => hidePopup(buttonsPopup));
});

// обработка закрытия попапов при клике по оверлею
popupOverlays.forEach((overlay) => overlay.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup_opened')) {
    hidePopup(event.target);
  }})
);

// обработка формы редактирования профиля
profileEditButtonElement.addEventListener('click', function () {
  popupUserNameInput.value = userNameElement.textContent;
  popupUserJobInput.value = userJobElement.textContent;
  showPopup(popupUserElement);
});
popupUserFormElement.addEventListener('submit', function (event) {
  event.preventDefault();
  userNameElement.textContent = popupUserNameInput.value;
  userJobElement.textContent = popupUserJobInput.value;
  hidePopup(popupUserElement);
});

// обработка формы добавления карточки
profileAddButtonElement.addEventListener('click', () => {
  showPopup(popupMestoElement);
});
popupMestoFormElement.addEventListener('submit', function (event) {
  event.preventDefault();
  const mesto = {
    link: popupMestoUrlInput.value,
    name: popupMestoNameInput.value
  };
  renderMesto(addMesto(mesto));
  popupMestoFormElement.reset();
  hidePopup(popupMestoElement);
});

// наполнение страницы шаблонными карточками мест
placeInitialDataOnPage(INITIAL_CARDS);

// включение валидации
enableValidation(VALIDATION_CONFIG)