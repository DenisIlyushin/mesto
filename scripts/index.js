const profileEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
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
let likeButtonsElement = document.querySelectorAll(".mesto__like-button");

function showPopup() {
  popupElement.classList.add("popup_opened");
  popupUserNameInput.value = userNameElement.textContent;
  popupUserJobInput.value = userJobElement.textContent;
}

function hidePopup() {
  popupElement.classList.remove("popup_opened");
}

function hidePopupByClickOnOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  hidePopup();
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = popupUserNameInput.value;
  userJobElement.textContent = popupUserJobInput.value;
  hidePopup();
}

function toggleMestoLikedStatus(event) {
  event.target.classList.toggle("mesto__like-button_liked");
}

profileEditButtonElement.addEventListener("click", showPopup);
popupCloseButtonElement.addEventListener("click", hidePopup);
popupElement.addEventListener("click", hidePopupByClickOnOverlay);
popupElement.addEventListener("submit", handleFormSubmit);
likeButtonsElement.forEach((likeButton) => {
  likeButton.addEventListener("click", toggleMestoLikedStatus);
});
