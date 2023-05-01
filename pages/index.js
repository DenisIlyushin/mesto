import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  validationConfig,
  indexPageSelectors,
  profileEditButtonElement,
  popupUserFormElement,

} from '../utils/constants.js';

// обработка формы редактирования профиля
const userProfile = new UserInfo({
  userNameSelector: indexPageSelectors.userName,
  userJobSelector: indexPageSelectors.userJob
});
const userFormValidator = new FormValidator(
  popupUserFormElement,
  validationConfig
);
userFormValidator.enableValidation()

const editProfilePopup = new PopupWithForm({
  formSubmitCallback: (data) => {
    userProfile.setUserInfo(data)
    editProfilePopup.close()
  }
}, indexPageSelectors.popupUser);
editProfilePopup.setEventListeners();

profileEditButtonElement.addEventListener('click', function () {
  editProfilePopup.setInputValues({ data: userProfile.getUserInfo() });
  userFormValidator.resetValidation();
  editProfilePopup.open()
});

// обработка начального наполнения карточек
function addMesto(mestoObj) {
  const mesto = new Card(
    {
      dataObj: mestoObj,
      handleCardClick: (mestoObj) => {
        mestoViewPopup.open({ data: mestoObj })
      }
    }, indexPageSelectors.mestoTemplate,
  )
  return mesto.make();
}

const mestoViewPopup = new PopupWithImage(indexPageSelectors.popupMestoImage);
mestoViewPopup.setEventListeners();

const mestoSection = new Section({
  items: initialCards,
  rendererCallback: (mestoObj) => {
    mestoSection.addItem( addMesto(mestoObj) );
  }
}, indexPageSelectors.placesContainer);
mestoSection.renderItems();

