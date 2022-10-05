// import initialCards from '../utils/constants.js';
const container = document.querySelector('.container');
const btnOpenEditCardForm = container.querySelector('.profile__edit-button');
const btnOpenAddCardForm = container.querySelector('.profile__add-button');
const buttonsForClosingPopup = document.querySelectorAll('.popup__close-button');
const elementTemplate = document.querySelector('#element').content;
const popupImgButton = elementTemplate.querySelectorAll('.element__img');
const formElementEdit = document.querySelector('.popup_edit-profile');
const formElementAdd = document.querySelector('.popup_add-card');
const formElementImg = document.querySelector('.popup_open-image');
const imgSrc = formElementImg.querySelector('.popup__img');
const imgTitle = formElementImg.querySelector('.popup__img-title');
const formElements = document.querySelectorAll('.popup');
const nameInput = formElementEdit.querySelector('.popup__input_name');
const jobInput = formElementEdit.querySelector('.popup__input_about');
const titleInput = formElementAdd.querySelector('.popup__input_title');
const linkInput = formElementAdd.querySelector('.popup__input_link');
const profileTitle = container.querySelector('.profile__title');
const profileSubtitle = container.querySelector('.profile__subtitle');
const elements = container.querySelector('.elements');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openEditForm() { //открыть форму редактирования профиля
  formElementEdit.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openAddForm() { //открыть форму добавления карточки
  formElementAdd.classList.add('popup_opened');
  titleInput.value = '';
  linkInput.value = '';
}

//закрыть попап 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
// function closePopup() {
//   for (let i = 0; i < formElements.length; i++) {
//     formElements[i].classList.remove('popup_opened');
//   }
// }

//поставить/убрать лайк
function setListenerToToggleLikeCard(elem) {
  elem.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active')
  });
}

//удалить карточку
function setListenerToDeleteCard(elem) {
  const deleteButton = elem.querySelectorAll('.element__delete-button');
  deleteButton[0].addEventListener('click', function () {
    const listItem = deleteButton[0].closest('.element');
    listItem.remove();
  });
}

//Открыть картинку
function setListenerToOpenImagePopup(elem, elementLink, elementName) {
  const openImgButton = elem.querySelectorAll('.element__img');
  openImgButton[0].addEventListener('click', function (evt) {
    formElementImg.classList.add('popup_opened');
    imgSrc.setAttribute("src", elementLink);
    imgSrc.setAttribute("alt", `Изображение ${elementName}`);
    imgTitle.textContent = elementName;
  });
}
//Создать новую карточку
function addCard(elementName, elementLink) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__title').textContent = elementName;
  element.querySelector('.element__img').setAttribute("src", elementLink);
  element.querySelector('.element__img').setAttribute("alt", `Изображение ${elementName}`);

  return element;
}

//добавление элементов
function addElement(elementName, elementLink) {
  let element = addCard(elementName, elementLink);

  setListenerToToggleLikeCard(element);  //поставить/убрать лайк

  setListenerToDeleteCard(element); //удалить карточку

  setListenerToOpenImagePopup(element, elementLink, elementName); //открыть карточку

  elements.prepend(element); //добавить карточку
}

//обработчики форм
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  addElement(titleInput.value, linkInput.value);
  closePopup();
}

btnOpenEditCardForm.addEventListener('click', openEditForm); //отслеживаем клик кнопки редактировать

btnOpenAddCardForm.addEventListener('click', openAddForm); //отслеживаем клик кнопки добавить
//закрыть попап
for (let i = 0; i < formElements.length; i++) {
  buttonsForClosingPopup[i].addEventListener('click', closePopup);
};

//заполняем карточки по-умолчанию
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', submitEditProfileForm);

formElementAdd.addEventListener('submit', submitAddCardForm);
