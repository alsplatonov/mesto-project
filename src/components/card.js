import {
  initialCards
  , elementTemplate
  , formElementImg
  , imgSrc
  , imgTitle
  , elements
} from './constants.js';
import { openPopup } from './modal.js';
import {
  getUserInfo
  , getInitialCards
  , patchProfileInfo
  , postCard
  , deleteUserCard
  , putLiketoCard
  , deleteLike
  , changeUserAvatar
} from './serverApi.js';

import { handleLikeCard, handleDeleteCard } from './index.js';

//поставить/убрать лайк
function setListenerToToggleLikeCard(elem, card) {
  elem.querySelector('.element__like-button').addEventListener('click', function (evt) {
    const likesAmount = elem.querySelector('.element__like-amount');
    if (!evt.target.classList.contains('element__like-button_active')) {
      evt.target.classList.add('element__like-button_active');
      putLiketoCard(card._id)
        .then((CardInfo) => {
          likesAmount.textContent = CardInfo.likes.length;
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      evt.target.classList.remove('element__like-button_active');
      deleteLike(card._id)
        .then((CardInfo) => {
          likesAmount.textContent = CardInfo.likes.length;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  });
}

//удалить карточку
function setListenerToDeleteCard(elem, card) {
  const deleteButton = elem.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function () {
    deleteUserCard(card._id)
      .then(() => {
        const listItem = deleteButton.closest('.element');
        listItem.remove();
      })
      .catch((error) => {
        console.log(error);
      })
  });
}

//Открыть картинку
function setListenerToOpenImagePopup(openImgButton, elementLink, elementName) {
  openImgButton.addEventListener('click', function (evt) {
    imgSrc.setAttribute("src", elementLink);
    imgSrc.setAttribute("alt", `Изображение ${elementName}`);
    imgTitle.textContent = elementName;
    openPopup(formElementImg);
  });
}
//Создать новую карточку
function createCard(user_id, cardItem) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const likesAmount = element.querySelector('.element__like-amount');
  const deleteButton = element.querySelector('.element__delete-button');
  const likeButton = element.querySelector('.element__like-button');
  element.querySelector('.element__title').textContent = cardItem.name;
  likesAmount.textContent = cardItem.likes.length;
  const elementImg = element.querySelector('.element__img');
  elementImg.setAttribute("src", cardItem.link);
  elementImg.setAttribute("alt", `Изображение ${cardItem.name}`);

  console.log('me = ' + user_id + ' and card = ' + cardItem.owner._id);


  if (user_id != cardItem.owner._id) {
    deleteButton.classList.remove('element__delete-button_activate');
  }


  likeButton.addEventListener('click', function (evt) { //поставить/убрать лайк
    handleLikeCard(checkStatusLike(evt), cardItem._id, evt, likesAmount);
  });

  deleteButton.addEventListener('click', function (evt) { //удалить карточку
    handleDeleteCard(cardItem._id, evt.target);
  });

  //  setListenerToToggleLikeCard(element, cardItem);  //поставить/убрать лайк

  // setListenerToDeleteCard(element, cardItem); //удалить карточку

  setListenerToOpenImagePopup(elementImg, cardItem.link, cardItem.name); //открыть карточку

  return element;
}

function checkStatusLike(evt) {

  return (evt.target.classList.contains('element__like-button_active'));
}


function changeLike(CardInfo, evt, status, likesAmount) {
  if (!status) {
    evt.target.classList.add('element__like-button_active')
  } else {
    evt.target.classList.remove('element__like-button_active')
  }
  likesAmount.textContent = CardInfo.likes.length;
}


//добавление элементов
function addElement(elementName, elementLink) {
  const element = createCard(elementName, elementLink);
  elements.prepend(element); //добавить карточку
}


//заполняем карточки по-умолчанию
// initialCards.forEach(function (item) {
//   addElement(item.name, item.link);
// });


export { addElement, createCard, changeLike };



