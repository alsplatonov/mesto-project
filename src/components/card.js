import {
  initialCards
  , elementTemplate
  , formElementImg
  , imgSrc
  , imgTitle
  , elements
} from './constants.js';
import { openPopup } from './modal.js';

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


//заполняем карточки по-умолчанию
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});


export { addElement };