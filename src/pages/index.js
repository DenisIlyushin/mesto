import './index.css'

import Api from '../components/Api.js'
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
  popupUserFormElement,
  popupMestoFormElement,
  profileEditButtonElement,
  profileAddButtonElement
} from '../utils/constants.js';

// обработка формы редактирования профиля
const userProfile = new UserInfo({
  userNameSelector: indexPageSelectors.userName,
  userJobSelector: indexPageSelectors.userJob,
  userAvatarSelector: indexPageSelectors.userAvatar
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
  editProfilePopup.setInputValues( {data: userProfile.getUserInfo()} );
  userFormValidator.resetValidation();
  editProfilePopup.open()
});

// обработка начального наполнения карточек
function addMesto(mestoObj) {
  const mesto = new Card(
    {
      dataObj: mestoObj,
      handleCardClick: (mestoObj) => {
        mestoViewPopup.open({data: mestoObj})
      }
    }, indexPageSelectors.mestoTemplate,
  )
  return mesto.make();
}

const mestoViewPopup = new PopupWithImage(indexPageSelectors.popupMestoImage);
mestoViewPopup.setEventListeners();

const mestoSection = new Section({
  rendererCallback: (mestoObj) => {
    mestoSection.addItem( addMesto(mestoObj) );
  }
}, indexPageSelectors.placesContainer);

// обработка добавления новой карточки места
const addMestoValidator = new FormValidator(
  popupMestoFormElement,
  validationConfig
);
addMestoValidator.enableValidation()

const addMestoPopup = new PopupWithForm({
  formSubmitCallback: (mestoObj) => {
    mestoSection.addItem( addMesto(mestoObj) );
    addMestoPopup.close();
  },
}, indexPageSelectors.popupMesto);
addMestoPopup.setEventListeners();

profileAddButtonElement.addEventListener('click', () => {
  addMestoValidator.resetValidation();
  addMestoPopup.open();
});


let myID;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'dc6a4a93-0c58-4e81-85df-4663aee25693',
    'Content-Type': 'application/json',
  },
})

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    console.log(userInfo)
    myID = userInfo._id;
    userProfile.setUserInfo({
      name: userInfo.name,
      job: userInfo.about,
      avatar: userInfo.avatar
    });
    mestoSection.renderItems(cards);
  })
  .catch(console.log);