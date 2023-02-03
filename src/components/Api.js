export default class Api {
  #baseUrl;
  #headers;
  constructor({ baseUrl, headers }) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
  }

  //Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this.#baseUrl}/users/me`, {
      headers: this.#headers
    })
      .then(this.#checkResponse);
  }

  //Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this.#baseUrl}/cards`, {
      headers: this.#headers
    })
      .then(this.#checkResponse);
  }

  //Редактирование профиля
  patchProfileInfo({ name, about }) {
    return fetch(`${this.#baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({

        name: name,
        about: about
      })
    })
      .then(this.#checkResponse);
  }

  //Добавление новой карточки
  postCard({ name, link }) {
    return fetch(`${this.#baseUrl}/cards`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this.#checkResponse);
  }

  //Удаление карточки
  deleteUserCard(cardId) {
    return fetch(`${this.#baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.#headers
    })
      .then(this.#checkResponse);
  }


  //Постановка лайка
  putLiketoCard(cardId) {
    return fetch(`${this.#baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.#headers
    })
      .then(this.#checkResponse);
  }

  //Снятие лайка
  deleteLike(cardId) {
    return fetch(`${this.#baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.#headers
    })
      .then(this.#checkResponse);
  }

  //изменение аватара
  changeUserAvatar(avatar) {
    return fetch(`${this.#baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    })
      .then(this.#checkResponse);
  }

  #checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


}