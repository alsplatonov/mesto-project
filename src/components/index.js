

import '../pages/index.css';
import {
  initialCards
  , container
  , btnOpenEditCardForm
  , btnOpenAddCardForm
  , buttonsForClosingPopup
  , btnCloseEditCardForm
  , btnCloseAddCardForm
  , btnCloseImgForm
  , elementTemplate
  , popupImgButton
  , formElementEdit
  , formElementAdd
  , formElementImg
  , imgSrc
  , imgTitle
  , formElements
  , nameInput
  , jobInput
  , titleInput
  , linkInput
  , profileTitle
  , profileSubtitle
  , elements
} from './constants.js';
import { enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';



function openEditForm() { //открыть форму редактирования профиля
  openPopup(formElementEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openAddForm() { //открыть форму добавления карточки
  openPopup(formElementAdd);
  titleInput.value = '';
  linkInput.value = '';
}

//поставить/убрать лайк
function setListenerToToggleLikeCard(elem) {
  elem.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active')
  });
}

//удалить карточку
function setListenerToDeleteCard(elem) {
  const deleteButton = elem.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.element');
    listItem.remove();
  });
}

//Открыть картинку
function setListenerToOpenImagePopup(openImgButton, elementLink, elementName) {
  openImgButton.addEventListener('click', function (evt) {
    openPopup(formElementImg);
    imgSrc.setAttribute("src", elementLink);
    imgSrc.setAttribute("alt", `Изображение ${elementName}`);
    imgTitle.textContent = elementName;
  });
}
//Создать новую карточку
function createCard(elementName, elementLink) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__title').textContent = elementName;
  const elementImg = element.querySelector('.element__img');
  elementImg.setAttribute("src", elementLink);
  elementImg.setAttribute("alt", `Изображение ${elementName}`);

  setListenerToToggleLikeCard(element);  //поставить/убрать лайк

  setListenerToDeleteCard(element); //удалить карточку

  setListenerToOpenImagePopup(elementImg, elementLink, elementName); //открыть карточку

  return element;
}

//добавление элементов
function addElement(elementName, elementLink) {
  const element = createCard(elementName, elementLink);
  elements.prepend(element); //добавить карточку
}

//обработчики форм
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(formElementEdit);
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  addElement(titleInput.value, linkInput.value);
  closePopup(formElementAdd);
}

btnOpenEditCardForm.addEventListener('click', openEditForm); //отслеживаем клик кнопки редактировать

btnOpenAddCardForm.addEventListener('click', openAddForm); //отслеживаем клик кнопки добавить

//закрыть попапы
btnCloseEditCardForm.addEventListener('click', function () { //Форма редактирования профиля
  closePopup(formElementEdit);
});

btnCloseAddCardForm.addEventListener('click', function () { //форма добавления карточки
  closePopup(formElementAdd);
});

btnCloseImgForm.addEventListener('click', function () { //Закрыть форму картинки
  closePopup(formElementImg);
});

//заполняем карточки по-умолчанию
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', submitEditProfileForm);

formElementAdd.addEventListener('submit', submitAddCardForm);



enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});