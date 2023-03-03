const profileEditButtonElement = document.querySelector(".profile__edit-button");
let popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
let popupUserNameInput = popupElement.querySelector(".form > #popup-user-name");
let popupUserJobInput = popupElement.querySelector(".form > #popup-user-job");
let userNameElement = document.querySelector(
  "section.profile > div.profile__info > .profile__user-name"
);
let userJobElement = document.querySelector(
  "section.profile > div.profile__info > .profile__user-job"
);

function showPopup() {
  popupElement.classList.add("popup_opened");
  popupUserNameInput.value = userNameElement.textContent;
  popupUserJobInput.value = userJobElement.textContent;
}

function hidePopup() {
  popupElement.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = popupUserNameInput.value;
  userJobElement.textContent = popupUserJobInput.value;
  hidePopup();
}

profileEditButtonElement.addEventListener("click", showPopup);
popupCloseButtonElement.addEventListener("click", hidePopup);
popupElement.addEventListener("submit", handleFormSubmit);
