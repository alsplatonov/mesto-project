import '../pages/index.css';
import {
  initialCards
  , container
  , btnOpenEditCardForm
  , btnOpenEditAvatar
  , btnOpenAddCardForm
  , profileAvatar
  , buttonsForClosingPopup
  , btnCloseEditCardForm
  , btnCloseEditAvatar
  , btnCloseAddCardForm
  , btnCloseImgForm
  , elementTemplate
  , popupImgButton
  , formElementEdit
  , formAvatarEdit
  , formElementAdd
  , formElementImg
  , imgSrc
  , imgTitle
  , formElements
  , nameInput
  , jobInput
  , titleInput
  , linkInput
  , linkInputAvatar
  , profileTitle
  , profileSubtitle
  , elements
  , submitBtnMesto
  , submitBtnProfile
  , submitBtnAvatar
} from './constants.js';

import Card from "../components/card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-17',
  headers: {
    authorization: '1d4e0d9e-039a-449f-a329-44ee6b357555',
    'Content-Type': 'application/json'
  }
})

// функция создания карточек
function createNewCard(dataCard, userId) {
  const card = new Card(dataCard, '#element', userId, handleCardClick, handleLikeCard, handleDeleteCard);
  const newCard = card.createCard();
  function handleLikeCard(status, card) {
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

  function handleDeleteCard() {
    api.deleteUserCard(dataCard._id)
      .then(() => {
        // const listItem = deleteButton.closest('.element');
        // listItem.remove();
        newCard.remove();
      })
      .catch((error) => {
        console.log(error);
      })
  }


  return newCard;
}
// const card = new Card(cardData, '#element', handleCardClick, handleLikeCard, handleDeleteCard);

const cardSection = new Section({
  renderer: (item, id) => {
    // const card = api.createCard(item)
    cardSection.addItem(createNewCard(item, id));
  }
}, '.elements');


// const popupEditProfileInstance = new PopupWithForm('.popup_edit-profile', api.patchProfileInfo.bind(api));
// const popupAddCardInstance = new PopupWithForm('.popup_add-card', api.postCard.bind(api));
// const popupWithImageInstance = new PopupWithImage('.popup_open-image');
const UserInfoInstance = new UserInfo({
  nameElementSelector: '.profile__title',
  descElementSelector: '.profile__subtitle',
}, api.getUserInfo.bind(api), api.patchProfileInfo.bind(api));

Promise.all([UserInfoInstance.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // загрузка инфо о пользователе с сервера 
    // profileGlobal = userInfo;

    profileTitle.textContent = userInfo.name;
    profileSubtitle.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    console.log(userInfo._id);
    console.log(initialCards);
    // загрузка карточек c сервера
    cardSection.setItem(initialCards, userInfo._id);
    cardSection.renderItems();
  })
  .catch((error) => { //обработка ошибок
    console.log(error);
  })

  

  // 3 попап - Раскрытие картинки на весь экран:
  const popupWithImageInstance = new PopupWithImage('.popup_open-image');
popupWithImageInstance.setEventListeners();

function handleCardClick(name, link) {
	popupWithImageInstance.openPopup({src: link, alt: name});
  
};

