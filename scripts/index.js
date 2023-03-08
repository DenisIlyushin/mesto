
// переменные блока "Работа с формой профиля"
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const popupUserElement = document.querySelector('#editProfile');
const popupUserCloseButtonElement = popupUserElement.querySelector('.popup__close-button');
const popupUserFormElement = document.forms.popupEditProfileInfo;
const popupUserNameInput = popupUserFormElement.userName;
const popupUserJobInput = popupUserFormElement.userJob;
const userNameElement = document.querySelector('.profile__user-name');
const userJobElement = document.querySelector('.profile__user-job');



// Лайки
function addEventListenerToLikeButtons () {
  const likeButtonsElement = document.querySelectorAll(".mesto__like-button");
  likeButtonsElement.forEach((likeButton) => {
    likeButton.addEventListener("click", function(event) {
      event.target.classList.toggle("mesto__like-button_liked");
    });
  });
}
addEventListenerToLikeButtons()

// Кнопки удаления
function addEventListenerToDeleteButtons () {
  const deleteButtonsElement = document.querySelectorAll(".mesto__delete-button");
  deleteButtonsElement.forEach((deleteButton) => {
    deleteButton.addEventListener("click", function(event) {
      // event.target.;
      console.log(`Удалить карточку ${event.target.parentElement.querySelector('.mesto__description').innerText}`)
    });
  });
}
addEventListenerToDeleteButtons()

// Работа с формой профиля
function showUserPopup() {
  popupUserElement.classList.add('popup_opened');
  popupUserNameInput.value = userNameElement.textContent;
  popupUserJobInput.value = userJobElement.textContent;
}

function hideUserPopup() {
  popupUserElement.classList.remove('popup_opened');
}

function handleUserFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = popupUserNameInput.value;
  userJobElement.textContent = popupUserJobInput.value;
  hideUserPopup();
}

profileEditButtonElement.addEventListener('click', showUserPopup);
popupUserCloseButtonElement.addEventListener('click', hideUserPopup);
popupUserFormElement.addEventListener('submit', handleUserFormSubmit);

// Работа с формой карточки
// переменные блока "Работа с формой карточки"
const profileAddButtonElement = document.querySelector('.profile__add-button');
const popupMestoElement = document.querySelector('#addMesto');
const popupMestoCloseButtonElement = popupMestoElement.querySelector('.popup__close-button');
const popupMestoFormElement = document.forms.popupAddMesto;
const popupMestoNameInput = popupMestoFormElement.mestoName;
const popupMestoJobInput = popupMestoFormElement.mestoUrl;

function showMestoPopup() {
  popupMestoElement.classList.add('popup_opened');
}

function hideMestoPopup() {
  popupMestoElement.classList.remove('popup_opened');
}

function handleMestoFormSubmit(evt) {
  evt.preventDefault();
// 
  hideMestoPopup();
}

profileAddButtonElement.addEventListener('click', showMestoPopup);
popupMestoCloseButtonElement.addEventListener('click', hideMestoPopup);
popupMestoFormElement.addEventListener('submit', handleMestoFormSubmit);

