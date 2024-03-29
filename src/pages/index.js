import './index.css'

import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {
  validationConfig,
  indexPageSelectors,
  popupUserFormElement,
  popupMestoFormElement,
  profileEditButtonElement,
  profileAddButtonElement, avatarFormElement, avatarEditButtonElement
} from '../utils/constants.js';
import PopupConfirm from '../components/PopupConfirm.js';

// подключение к API
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
    myID = userInfo._id;
    userProfile.setUserInfo({
      name: userInfo.name,
      job: userInfo.about,
      avatar: userInfo.avatar
    });
    mestoSection.renderItems(cards);
  })
  .catch(console.log);

// обработка форм редактирования профиля
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
    editProfilePopup.loading(true)
    api.setUserInfo({
      name: data.name,
      about: data.job,
      avatar: data.avatar
    })
      .then((response) => {
        userProfile.setUserInfo({
          name: response.name,
          job: response.about,
          avatar: response.avatar
        })
        editProfilePopup.close()
      })
      .catch(console.log)
      .finally(() => {
        editProfilePopup.loading(false)
      })
  }
}, indexPageSelectors.popupUser);
editProfilePopup.setEventListeners();

profileEditButtonElement.addEventListener('click', function () {
  userFormValidator.resetValidation();
  editProfilePopup.setInputValues({data: userProfile.getUserInfo()});
  editProfilePopup.open()
});

// обработка редактирования аватара
const userAvatarFormValidator = new FormValidator(
  avatarFormElement,
  validationConfig
)
userAvatarFormValidator.enableValidation()

const editAvatarPopup = new PopupWithForm({
  formSubmitCallback: (data) => {
    editAvatarPopup.loading(true, 'Обновление...')
    api.setUserAvatar({
      name: data.name,
      about: data.job,
      avatar: data.avatar
    })
      .then((response) => {
        userProfile.setUserInfo({
          name: response.name,
          job: response.about,
          avatar: response.avatar
        })
        editAvatarPopup.close()
      })
      .catch(console.log)
      .finally(() => {
        editAvatarPopup.loading(false)
      })
  }
}, indexPageSelectors.popupEditAvatar);
editAvatarPopup.setEventListeners();

avatarEditButtonElement.addEventListener('click', function () {
  editAvatarPopup.setInputValues({data: userProfile.getUserInfo()});
  userFormValidator.resetValidation();
  editAvatarPopup.open()
});

// обработка удаления карточек
const deleteConfirmationPopup = new PopupConfirm(
  '.popup_type_delete-mesto',
  (mesto) => {
    api.deleteCard(mesto.getID())
      .then(() => {
        mesto.delete();
        deleteConfirmationPopup.close();
      })
      .catch(console.log)
  }
);
deleteConfirmationPopup.setEventListeners();

// обработка начального наполнения карточек
function addMesto(mestoObj) {
  const mesto = new Card(
    {
      dataObj: mestoObj,
      userID: myID,
      zoomCardCallback: (mestoObj) => {
        mestoViewPopup.open({data: mestoObj})
      },
      deleteCardCallback: () => {
        deleteConfirmationPopup.open(mesto);
      },
      likeCallback: (cardID) => {
        api.likeCard(cardID)
          .then((response) => {
            mesto.setLikes(response);
          })
          .catch(console.log)
      },
      dislikeCallback: (cardID) => {
        api.dislikeCard(cardID)
          .then((response) => {
            mesto.setLikes(response);
          })
          .catch(console.log)
      }
    }, indexPageSelectors.mestoTemplate,
  )
  return mesto.make();
}

const mestoViewPopup = new PopupWithImage(indexPageSelectors.popupMestoImage);
mestoViewPopup.setEventListeners();

const mestoSection = new Section({
  rendererCallback: (mestoObj) => {
    mestoSection.addItem(addMesto(mestoObj));
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
    addMestoPopup.loading(true)
    api.createMesto(mestoObj)
      .then((response) => {
        mestoSection.addItem(addMesto(response));
        addMestoPopup.close();
      })
      .catch(console.log)
      .finally(() => {
        addMestoPopup.loading(false)
      })
  },
}, indexPageSelectors.popupMesto);
addMestoPopup.setEventListeners();

profileAddButtonElement.addEventListener('click', () => {
  addMestoValidator.resetValidation();
  addMestoPopup.open();
});