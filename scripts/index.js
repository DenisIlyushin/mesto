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
const popupMestoImageSource = popupMestoImageElement.querySelector('.mesto__image_popup');
const popupMestoImageTitle = popupMestoImageElement.querySelector('.mesto__heading_popup');

// Первоначальная начинка страница по темплейту
const placesList = document.querySelector('.places__list');
const initialCards = [
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

// Универсальные функции вызова и сокрытия попапа
function showPopup(popupElement) {
  popupElement.classList.add('popup_opened');

}

function hidePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// функция добавления карточек
function addMesto(mestoObj) {
  const mesto = document.querySelector('#mesto').content.cloneNode(true);
  const mestoImage = mesto.querySelector('.mesto__image');
  const mestoTitle = mesto.querySelector('.mesto__heading');

  mesto.querySelector('.mesto__heading').textContent = mestoObj.name;
  mesto.querySelector('.mesto__image').src = mestoObj.link;
  mesto.querySelector('.mesto__image').alt = `Фотография ${mestoObj.name}`;
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
  mestoImage.addEventListener('click', function() {
    popupMestoImageSource.src = mestoImage.src;
    popupMestoImageTitle.textContent = mestoTitle.textContent;
    showPopup(popupMestoImageElement);
  });
  placesList.prepend(mesto)
}

// добавляет первые карточки при загрузке страницы
function _initPage(initialMestoList) {
  initialMestoList.forEach((element) => {
    addMesto(element);
  });
}
_initPage(initialCards);

// обработка формы редактирования профиля
profileEditButtonElement.addEventListener('click', function() {
  popupUserNameInput.value = userNameElement.textContent;
  popupUserJobInput.value = userJobElement.textContent;
  showPopup(popupUserElement)
});
popupUserCloseButtonElement.addEventListener('click', () => {
  hidePopup(popupUserElement)
});
popupUserFormElement.addEventListener('submit', function(event) {
  event.preventDefault();
  userNameElement.textContent = popupUserNameInput.value;
  userJobElement.textContent = popupUserJobInput.value;
  hidePopup(popupUserElement);
});

// обработка формы добавления карточки
profileAddButtonElement.addEventListener('click', () => {
  showPopup(popupMestoElement)
});
popupMestoCloseButtonElement.addEventListener('click', () => {
  hidePopup(popupMestoElement)
});
popupMestoFormElement.addEventListener('submit', function(event) {
  event.preventDefault();
  mesto = {
    name: popupMestoNameInput.value,
    link: popupMestoUrlInput.value,
  }
  // Если данные были переданы в форму - создаем карточку Места на странице
  if (Object.values(mesto).every((value) => value !== null && value !== '')) {
    addMesto(mesto)
  }
  // Сброс значений в полях ввода в форме добавления Места
  const formInputs = event.target.querySelectorAll('.form__input')
  formInputs.forEach((element) => {
    element.value = ''
  });
  hidePopup(popupMestoElement);
});

// обработка закрытия попапа увеличения изображения карточки места
popupMestoImageCloseButtonElement.addEventListener('click', () => {
  hidePopup(popupMestoImageElement)
});