const profileEditButtonElement = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupFormElement = document.forms.popupEditProfileInfo;
// let popupUserNameInput = popupElement.querySelector('#userName');
// let popupUserJobInput = popupElement.querySelector('#userJob');
let popupUserNameInput = document.forms.popupEditProfileInfo.userName;
let popupUserJobInput = document.forms.popupEditProfileInfo.userJob;
let userNameElement = document.querySelector('.profile__user-name');
let userJobElement = document.querySelector('.profile__user-job');

function showPopup() {
  popupElement.classList.add('popup_opened');
  popupUserNameInput.value = userNameElement.textContent;
  popupUserJobInput.value = userJobElement.textContent;
}

function hidePopup() {
  popupElement.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = popupUserNameInput.value;
  userJobElement.textContent = popupUserJobInput.value;
  hidePopup();
}

profileEditButtonElement.addEventListener('click', showPopup);
popupCloseButtonElement.addEventListener('click', hidePopup);
popupFormElement.addEventListener('submit', handleFormSubmit);
