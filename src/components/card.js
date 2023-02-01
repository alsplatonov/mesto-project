import { openPopup } from './modal.js';
import {
  initialCards
  , elementTemplate
  , formElementImg
  , imgSrc
  , imgTitle
  , elements
} from './constants.js';

export default class Card {
  #name;
  #imageLink;
  #template;
  #likes;
  _cardId;
  #ownerId;
  #handleLikeCard;
  #handleDeleteCard;
  #handleCardClick;
  #userId;
  constructor(cardData, templateCardSelector, userId, handleCardClick, handleLikeCard, handleDeleteCard) {
    this.#name = cardData.name;
    this.#imageLink = cardData.link;
    this.#template = document.querySelector(templateCardSelector);
    this.#likes = cardData.likes;
    this._cardId = cardData._id;
    this.#ownerId = cardData.owner._id;
    this.#handleLikeCard = handleLikeCard;
    this.#handleDeleteCard = handleDeleteCard;
    this.#handleCardClick = handleCardClick;

    this.#userId = userId;
  }

  //функция простановки/снятия лайка карточки (пользователя)
  changeLike(likesAmount) {
    console.log(this._card);
    const likeCard = this._card.querySelector('.element__like-button');
    const likes = this._card.querySelector('.element__like-amount');
    if (likesAmount.length != 0) {
      likesAmount.forEach((likeOwner) => {
        if (likeOwner._id === this.#userId) {
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

  createCard() {
    const card = this.#template.content.querySelector('.element').cloneNode(true);

    const likesAmount = card.querySelector('.element__like-amount');
    const deleteButton = card.querySelector('.element__delete-button');
    card.querySelector('.element__title').textContent = this.#name;
    likesAmount.textContent = this.#likes.length;
    const elementImg = card.querySelector('.element__img');
    elementImg.setAttribute("src", this.#imageLink);
    elementImg.setAttribute("alt", `Изображение ${this.#name}`);

    this._card = card;

    if (this.#userId != this.#ownerId) {
      deleteButton.classList.remove('element__delete-button_activate');
    }
    this.changeLike(this.#likes); //проверяем карточку на наш лайк

    this.#setCardEventListeners();
    return this._card;
  }

  #checkStatusLike() {
    const likeCard = this._card.querySelector('.element__like-button');
    return (likeCard.classList.contains('element__like-button_active'));
  }

  #setCardEventListeners() {
    const deleteButton = this._card.querySelector('.element__delete-button');
    const likeButton = this._card.querySelector('.element__like-button');
    const elementImg = this._card.querySelector('.element__img');

    likeButton.addEventListener('click', () => { //поставить/убрать лайк
      this.#handleLikeCard(this.#checkStatusLike(), this);
    });

    deleteButton.addEventListener('click', () => { //удалить карточку
      this.#handleDeleteCard(this._cardId);
    });

    elementImg.addEventListener('click', () => { //открыть картинку
      this.#handleCardClick(this.#imageLink, this.#name);
    });
  }

}
