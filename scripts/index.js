const profileEditButtonElement = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupFormElement = document.forms.popupEditProfileInfo;
let popupUserNameInput = popupFormElement.userName;
let popupUserJobInput = popupFormElement.userJob;
let userNameElement = document.querySelector('.profile__user-name');
let userJobElement = document.querySelector('.profile__user-job');

// попап
// 
// 

/* Надо:
*  1. задать в начале кода попапа переменную с попапми на странице и с активными кнопками
*  2. ? создать на странице по списку нужные попапы из темплейта
*  3. написать универсальные функции showPopip и hidePopup с аргументами
*  4. отладить работу
*/ 


// универсальные функции для попапа
function showPopup() {
  popupElement.classList.add('popup_opened');
  popupUserNameInput.value = userNameElement.textContent;
  popupUserJobInput.value = userJobElement.textContent;
}

function hidePopup() {
  popupElement.classList.remove('popup_opened');
}


profileEditButtonElement.addEventListener('click', showPopup);
popupCloseButtonElement.addEventListener('click', hidePopup);

// 
// сабммит формы попапа
function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = popupUserNameInput.value;
  userJobElement.textContent = popupUserJobInput.value;
  hidePopup();
}
popupFormElement.addEventListener('submit', handleFormSubmit);




// 
// toggle лайков
let likeButtonsElement = document.querySelectorAll(".mesto__like-button");
function toggleMestoLikedStatus(event) {
  event.target.classList.toggle("mesto__like-button_liked");
}
// заменить на стрелочную функцию?
likeButtonsElement.forEach((likeButton) => {
  likeButton.addEventListener("click", toggleMestoLikedStatus);
});


// 
// закрытие попапа при мисклике
function hidePopupByClickOnOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  hidePopup();
}
popupElement.addEventListener("click", hidePopupByClickOnOverlay);

// раздели на модули: попап, генерация каточек, обработка профиля?
// напиши автогенерацию мест
// напиши удаление мест
