const container = document.querySelector('.container');
const editButton = container.querySelector('.profile__edit-button');
const addButton = container.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const popupImgButton = container.querySelectorAll('.element__img');
const formElementEdit = document.querySelector('.popup__header');
const formElementAdd = document.querySelector('.popup__card');
const formElementImg = document.querySelector('.popup__image');
const imgSrc = formElementImg.querySelector('.popup__img');
const imgTitle = formElementImg.querySelector('.popup__img-title');
const formElement = document.querySelectorAll('.popup');
const nameInput = formElementEdit.querySelectorAll('.popup__input')[0];
const jobInput = formElementEdit.querySelectorAll('.popup__input')[1];
const titleInput = formElementAdd.querySelectorAll('.popup__input')[0];
const linkInput = formElementAdd.querySelectorAll('.popup__input')[1];
const profileTitle = container.querySelector('.profile__title');
const profileSubtitle = container.querySelector('.profile__subtitle');
const elements = container.querySelector('.elements');
//массив карточек по-умолчанию
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openEditForm() { //открыть форму редактирования профиля
  formElementEdit.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openAddForm() { //открыть форму добавления карточки
  formElementAdd.classList.add('popup_opened');
}

//закрыть попап 
function closePopup() {
  for (let i = 0; i < formElement.length; i++) {
    formElement[i].classList.remove('popup_opened');
  }
}

//поставить/убрать лайк
function addLike(elem) {
  elem.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active')
  });
}

//удалить карточку
function deleteCard(elem) {
  let deleteButton = elem.querySelectorAll('.element__delete-button');
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', function () {
      let listItem = deleteButton[i].closest('.element');
      listItem.remove();
    })
  };
}

//Открыть картинку
function openImg(elem, elementLink, elementName) {
  let openImgButton = elem.querySelectorAll('.element__img');
  for (let i = 0; i < openImgButton.length; i++) {
    openImgButton[i].addEventListener('click', function (evt) {
      formElementImg.classList.add('popup_opened');
      imgSrc.setAttribute("src", elementLink);
      imgTitle.textContent = elementName;
    });
  }
}

//добавление элементов
function addElement(elementName, elementLink) {
  let elementTemplate = document.querySelector('#element').content;
  let element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__title').textContent = elementName;
  element.querySelector('.element__img').setAttribute("src", elementLink);

  addLike(element);  //поставить/убрать лайк

  deleteCard(element); //удалить карточку

  openImg(element, elementLink, elementName); //открыть карточку

  elements.prepend(element); //добавить карточку
}

//обработчики форм
function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  addElement(titleInput.value, linkInput.value);
  closePopup();
}

editButton.addEventListener('click', openEditForm); //отслеживаем клик кнопки редактировать

addButton.addEventListener('click', openAddForm); //отслеживаем клик кнопки добавить
//закрыть попап
for (let i = 0; i < formElement.length; i++) {
  closeButton[i].addEventListener('click', closePopup);
};

//заполняем карточки по-умолчанию
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);

formElementAdd.addEventListener('submit', formSubmitHandlerAdd);
