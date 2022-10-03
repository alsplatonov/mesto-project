const container = document.querySelector('.container');

const editButton = container.querySelector('.profile__edit-button');
const addButton = container.querySelector('.profile__add-button');

const formElementEdit = document.querySelector('.header-popup');
const formElementAdd = document.querySelector('.card-popup');

const nameInput = formElementEdit.querySelectorAll('.popup__input')[0];
const jobInput = formElementEdit.querySelectorAll('.popup__input')[1];

const titleInput = formElementAdd.querySelectorAll('.popup__input')[0];
const linkInput = formElementAdd.querySelectorAll('.popup__input')[1];

const profileTitle = container.querySelector('.profile__title');
const profileSubtitle = container.querySelector('.profile__subtitle');
const element = container.querySelector('.elements');


const closeButtonEdit = formElementEdit.querySelector('.popup__close-button');
const closeButtonAdd = formElementAdd.querySelector('.popup__close-button');

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


function openCloseEditForm() {
  if (formElementEdit.classList.contains('popup_opened')) {
    formElementEdit.classList.remove('popup_opened')
  } else {
    formElementEdit.classList.add('popup_opened');
    openFormEditAttr = formElementEdit.querySelectorAll('.popup__input');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

function openCloseAddForm() {
  if (formElementAdd.classList.contains('popup_opened')) {
    formElementAdd.classList.remove('popup_opened')
  } else {
    formElementAdd.classList.add('popup_opened');
  }
}


editButton.addEventListener('click', openCloseEditForm);
addButton.addEventListener('click', openCloseAddForm);

closeButtonEdit.addEventListener('click', openCloseEditForm);
closeButtonAdd.addEventListener('click', openCloseAddForm);



function addElementDefault(elementName, elementLink) {
  const elementTemplate = document.querySelector('#element').content;
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);

  elementElement.querySelector('.element__title').textContent = elementName;
  elementElement.querySelector('.element__img').setAttribute("src", elementLink);
  elementElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active')
  });
  // elementElement.querySelector('.element__img').textContent = elementLink;
  element.append(elementElement);
}

function addElement(elementName, elementLink) {
  const elementTemplate = document.querySelector('#element').content;
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);

  elementElement.querySelector('.element__title').textContent = elementName;
  elementElement.querySelector('.element__img').setAttribute("src", elementLink);
  elementElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active')
  });
  // elementElement.querySelector('.element__img').textContent = elementLink;
  element.prepend(elementElement);
}

for (let i = 0; i < initialCards.length; i++) {

  addElementDefault(initialCards[i].name, initialCards[i].link);
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  openCloseEditForm();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', formSubmitHandler);

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  addElement(titleInput.value, linkInput.value);
  openCloseAddForm();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);



