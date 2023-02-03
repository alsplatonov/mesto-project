import '../pages/index.css';
import {
  btnOpenEditCardForm
  , btnOpenEditAvatar
  , btnOpenAddCardForm
  , submitBtnMesto
  , submitBtnProfile
  , submitBtnAvatar
  , validateSelectors
  , baseUrl
  , headers
  , formElementEdit
  , formAvatarEdit
  , formElementAdd
  ,nameInput
  ,jobInput
} from '../utils/constants.js';

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";


const api = new Api({ baseUrl, headers });

// функция создания карточек
function createNewCard(dataCard, userId) {
  const card = new Card(dataCard, '#element', userId, handleCardClick, handleLikeCard, handleDeleteCard);
  const newCard = card.createCard();
  function handleLikeCard(status, card) { //проставка/снятие лайка
    !status ? api.putLiketoCard(dataCard._id)
      .then((res) => {
        card.changeLike(res.likes);
      })
      .catch((error) => {
        console.log(error);
      })
      : api.deleteLike(dataCard._id)
        .then((res) => {
          card.changeLike(res.likes);
        })
        .catch((error) => {
          console.log(error);
        })
  }

  function handleDeleteCard() {  //удаление карточки
    api.deleteUserCard(dataCard._id)
      .then(() => {
        newCard.remove();
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return newCard;
}

const cardSection = new Section({
  renderer: (item, id) => {
    cardSection.addItemAppend(createNewCard(item, id));
  }
}, '.elements');


const userInfoInstance = new UserInfo({
  nameElementSelector: '.profile__title',
  descElementSelector: '.profile__subtitle',
  avatarElementSelector: '.profile__avatar'
}, api.getUserInfo.bind(api));

Promise.all([userInfoInstance.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // загрузка инфо о пользователе с сервера 
    userInfoInstance.setUserInfo(userInfo);
    // загрузка карточек c сервера
    cardSection.setItem(initialCards, userInfo._id);
    cardSection.renderItems();
  })
  .catch((error) => { //обработка ошибок
    console.log(error);
  })

// Раскрытие картинки на весь экран
const popupWithImageInstance = new PopupWithImage('.popup_open-image');
popupWithImageInstance.setEventListeners();

function handleCardClick(link, name) {
  popupWithImageInstance.openPopup({ src: link, alt: name });
};


const popupEditProfileInstance = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
popupEditProfileInstance.setEventListeners();

const popupEditAvatarInstance = new PopupWithForm('.popup_edit-avatar', handleAvatarFormSubmit);
popupEditAvatarInstance.setEventListeners();

const popupAddCardInstance = new PopupWithForm('.popup_add-card', handleCardFormSubmit);
popupAddCardInstance.setEventListeners();


btnOpenEditCardForm.addEventListener('click', () => { //отслеживаем клик кнопки редактировать профиль
  const {name, about} =  userInfoInstance.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  popupEditProfileInstance.openPopup();
  profileValidator.resetValidation();
});

btnOpenEditAvatar.addEventListener('click', () => { //отслеживаем клик кнопки редактировать аватар
  popupEditAvatarInstance.openPopup();
  avatarValidator.resetValidation();
});

btnOpenAddCardForm.addEventListener('click', () => { //отслеживаем клик кнопки добавить карту
  popupAddCardInstance.openPopup();
  addCardValidator.resetValidation();
});


const profileValidator = new FormValidator(validateSelectors, formElementEdit); //валидация формы редактирования профиля
profileValidator.enableValidation();

const avatarValidator = new FormValidator(validateSelectors, formAvatarEdit); //валидация формы редактирования аватара
avatarValidator.enableValidation();

const addCardValidator = new FormValidator(validateSelectors, formElementAdd); //валидация формы добавления карточки
addCardValidator.enableValidation();


// функция редактирования аватара пользователя 
function handleAvatarFormSubmit(avatar) {
  submitBtnAvatar.textContent = 'Сохранение...';
  api.changeUserAvatar(avatar.link)
    .then((data) => {
      userInfoInstance.setUserInfo(data);
      popupEditAvatarInstance.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitBtnAvatar.textContent = 'Сохранить';
    })
}

// функция редактирования профиля пользователя 
function handleProfileFormSubmit(profileData) {
  submitBtnProfile.textContent = 'Сохранение...';
  api.patchProfileInfo(profileData)
    .then((data) => {
      userInfoInstance.setUserInfo(data);
      popupEditProfileInstance.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitBtnProfile.textContent = 'Сохранить';
    })
}

// функция добавления новых карточек от пользователя 
function handleCardFormSubmit(cardData) {
  submitBtnMesto.textContent = 'Создание...';
  api.postCard(cardData)
    .then((data) => {
      cardSection.addItemPrepend(createNewCard(data, data.owner._id));
      popupAddCardInstance.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitBtnMesto.textContent = 'Создать';
    })
}

//