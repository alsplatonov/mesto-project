export default class Card {
  constructor(cardData, templateCardSelector, handleLikeCard, handleDeleteCard, handleCardClick) {
    this.#name = cardData.name;
    this.#imageLink = cardData.imageLink;
    this.#template = document.querySelector(templateCardSelector);
    this.#likes = cardData.likes;
    this.#userId = cardData.userId;
    this.#cardId = cardData.id;
    this.#ownerId = cardData.owner._id;
    this.#handleLikeCard = handleLikeCard;
    this.#handleDeleteCard = handleDeleteCard;
    this.#handleCardClick = handleCardClick;
  }

  #checkStatusLike() {
    const likeCard = this._card.querySelector('.element__like-button');
    return (likeCard.classList.contains('element__like-button_active'));
  }

  createCard() {
    const card = this.#template.content.querySelector('.element').cloneNode(true);

    const likesAmount = card.querySelector('.element__like-amount');
    const deleteButton = card.querySelector('.element__delete-button');
    //const likeButton = card.querySelector('.element__like-button');
    card.querySelector('.element__title').textContent = this.#name;
    likesAmount.textContent = this.#likes.length;
    const elementImg = card.querySelector('.element__img');
    elementImg.setAttribute("src", this.#imageLink);
    elementImg.setAttribute("alt", `Изображение ${this.#name}`);

    this._card = card;

    if (this.#userId != this.#ownerId) {
      deleteButton.classList.remove('element__delete-button_activate');
    }

    changeLike(this.#likes, this.#userId); //проверяем карточку на наш лайк
    this.#setCardEventListeners();
  }



  //функция простановки/снятия лайка карточки (пользователя)
  changeLike(likesAmount, userId) {
    const likeCard = this._card.querySelector('.element__like-button');
    const likes = this._card.querySelector('.element__like-amount');
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


  #setCardEventListeners() {
    const deleteButton = this._card.querySelector('.element__delete-button');
    const likeButton = this._card.querySelector('.element__like-button');
    const elementImg = this._card.querySelector('.element__img');
    // elementImg.setAttribute("src", this.#imageLink);
    // elementImg.setAttribute("alt", `Изображение ${this.#name}`);

    likeButton.addEventListener('click', () => { //поставить/убрать лайк
      this.handleLikeCard(this.#checkStatusLike(), this.#cardId, this.#userId);
    });

    deleteButton.addEventListener('click', () => { //удалить карточку
      this.handleDeleteCard(this.#cardId);
    });

    elementImg.addEventListener('click', () => { //открыть картинку
      this._handleCardClick(this.#name, this.#imageLink);
    });
  }




}
