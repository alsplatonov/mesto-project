import {
  initialCards
  , elementTemplate
  , formElementImg
  , imgSrc
  , imgTitle
  , elements
} from './constants.js';
import { openPopup } from './modal.js';

import { handleLikeCard, handleDeleteCard } from './index.js';


function checkStatusLike(cardItem) {
  const likeCard = cardItem.querySelector('.element__like-button');
  return (likeCard.classList.contains('element__like-button_active'));
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

  // console.log('me = ' + user_id + ' and card = ' + cardItem.owner._id);
  if (user_id != cardItem.owner._id) {
    deleteButton.classList.remove('element__delete-button_activate');
  }

  changeLike(cardItem.likes, user_id, element); //проверяем карточку на наш лайк

  likeButton.addEventListener('click', () => { //поставить/убрать лайк
    handleLikeCard(checkStatusLike(element), cardItem._id, user_id, element);
  });

  deleteButton.addEventListener('click', function (evt) { //удалить карточку
    handleDeleteCard(cardItem._id, evt.target);
  });

  elementImg.addEventListener('click', function (evt) { //открыть картинку
    imgSrc.setAttribute("src", cardItem.link);
    imgSrc.setAttribute("alt", `Изображение ${cardItem.name}`);
    imgTitle.textContent = cardItem.name;
    openPopup(formElementImg);
  });

  return element;
}

//функция простановки/снятия лайка карточки (пользователя)
function changeLike(likesAmount, userId, cardItem) {
  const likeCard = cardItem.querySelector('.element__like-button');
  const likes = cardItem.querySelector('.element__like-amount');
  if (likesAmount.length != 0) {
    likesAmount.forEach((likeOwner) => {
      if (likeOwner._id === userId) {
        likeCard.classList.add('element__like-button_active');
      } else {
        likeCard.classList.remove('element__like-button_active');
      }
    });
  } else {
    likeCard.classList.remove('element__like-button_active');
  }
  likes.textContent = likesAmount.length;
}
//добавление элементов
// function addElement(elementName, elementLink) {
//   const element = createCard(elementName, elementLink);
//   elements.prepend(element); //добавить карточку
// }


export { addElement, createCard, changeLike };



