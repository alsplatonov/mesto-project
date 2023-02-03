

export default class Card {
  #name;
  #imageLink;
  #template;
  #likes;
  #cardId;
  #ownerId;
  #handleLikeCard;
  #handleDeleteCard;
  #handleCardClick;
  #userId;
  #likeCard;
  #likesAmount;
  #deleteButton;
  #elementImg;

  constructor(cardData, templateCardSelector, userId, handleCardClick, handleLikeCard, handleDeleteCard) {
    this.#name = cardData.name;
    this.#imageLink = cardData.link;
    this.#template = document.querySelector(templateCardSelector);
    this.#likes = cardData.likes;
    // this.#cardId = null;
    this.#ownerId = cardData.owner._id;
    this.#handleLikeCard = handleLikeCard;
    this.#handleDeleteCard = handleDeleteCard;
    this.#handleCardClick = handleCardClick;

    this.#userId = userId;
  }

  //функция простановки/снятия лайка карточки (пользователя)
  changeLike(likes) {
    if (likes.length != 0) {
      likes.forEach((likeOwner) => {
        if (likeOwner._id === this.#userId) {
          this.#likeCard.classList.add('element__like-button_active');
        } else {
          this.#likeCard.classList.remove('element__like-button_active');
        }
      });
    } else {
      this.#likeCard.classList.remove('element__like-button_active');
    }
    this.#likesAmount.textContent = likes.length;
  }

  createCard() {
    const card = this.#template.content.querySelector('.element').cloneNode(true);

    this.#likesAmount = card.querySelector('.element__like-amount');
    this.#likesAmount.textContent = this.#likes.length;

    this.#deleteButton = card.querySelector('.element__delete-button');

    card.querySelector('.element__title').textContent = this.#name;

    this.#elementImg = card.querySelector('.element__img');
    this.#elementImg.setAttribute("src", this.#imageLink);
    this.#elementImg.setAttribute("alt", `Изображение ${this.#name}`);

    this.#cardId = card;

    this.#likeCard = this.#cardId.querySelector('.element__like-button');

    if (this.#userId != this.#ownerId) {
      this.#deleteButton.classList.remove('element__delete-button_activate');
    }
    this.changeLike(this.#likes); //проверяем карточку на наш лайк

    this.#setCardEventListeners();
    return this.#cardId;
  }

  #checkStatusLike() {
    return (this.#likeCard.classList.contains('element__like-button_active'));
  }

  #setCardEventListeners() {
    // const this.#deleteButton = this.#cardId.querySelector('.element__delete-button');
    // const likeButton = this.#cardId.querySelector('.element__like-button');
    // const this.#elementImg = this.#cardId.querySelector('.element__img');

    this.#likeCard.addEventListener('click', () => { //поставить/убрать лайк
      this.#handleLikeCard(this.#checkStatusLike(), this);
    });

    this.#deleteButton.addEventListener('click', () => { //удалить карточку
      this.#handleDeleteCard(this.#cardId);
    });

    this.#elementImg.addEventListener('click', () => { //открыть картинку
      this.#handleCardClick(this.#imageLink, this.#name);
    });
  }

}
