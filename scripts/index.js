// константы блока "Работа с формой профиля"
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const popupUserElement = document.querySelector('#editProfile');
const popupUserCloseButtonElement = popupUserElement.querySelector('.popup__close-button');
const popupUserFormElement = document.forms.popupEditProfileInfo;
const popupUserNameInput = popupUserFormElement.userName;
const popupUserJobInput = popupUserFormElement.userJob;
const userNameElement = document.querySelector('.profile__user-name');
const userJobElement = document.querySelector('.profile__user-job');

// константы блока "Работа с формой карточки места"
const profileAddButtonElement = document.querySelector('.profile__add-button');
const popupMestoElement = document.querySelector('#addMesto');
const popupMestoCloseButtonElement = popupMestoElement.querySelector('.popup__close-button');
const popupMestoFormElement = document.forms.popupAddMesto;
const popupMestoNameInput = popupMestoFormElement.mestoName;
const popupMestoUrlInput = popupMestoFormElement.mestoUrl;

// Константы блока "Работа с увеличенным изображением Места"
const popupMestoImageElement = document.querySelector('#mestoPopup');
const popupMestoImageCloseButtonElement = popupMestoImageElement.querySelector('.popup__close-button');
const popupMestoImageSource = popupMestoImageElement.querySelector('.popup__image-popup');
const popupMestoImageTitle = popupMestoImageElement.querySelector('.popup__heading-popup');

// Первоначальная начинка страница по темплейту
// данные карточек приходят из `./scripts/cards.js`
const placesContainer = document.querySelector('.places__list');
const mestoTemplate = document.querySelector('#mesto').content.querySelector('.mesto');

// Константы страницы
const popupsCloseButtonElement = document.querySelectorAll('.popup__close-button');

// Универсальные функции вызова и сокрытия попапа
function showPopup(popupElement) {
  popupElement.classList.add('popup_opened');

}

function hidePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// добавить карточку на страницу
function renderMesto(mestoObj) {
  placesContainer.prepend(mestoObj);
}

// создать каторчку
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
  // placesContainer.prepend(mesto)
  return mesto;
}

// добавляет первые карточки при загрузке страницы
function placeInitialDataOnPage(initialMestoList) {
  const places = initialMestoList.map((mesto) => {
    renderMesto(addMesto(mesto));
  });
}

placeInitialDataOnPage(initialCards);

// обработка закрытия всех попапов
popupsCloseButtonElement.forEach((button) => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => hidePopup(buttonsPopup));
});

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