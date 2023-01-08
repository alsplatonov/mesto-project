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
  ,submitBtnMesto
} from './constants.js';
import { enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { addElement } from './card.js';



function openEditForm() { //открыть форму редактирования профиля
  openPopup(formElementEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openAddForm() { //открыть форму добавления карточки
  openPopup(formElementAdd);
  titleInput.value = '';
  linkInput.value = '';
  submitBtnMesto.disabled = true;
  submitBtnMesto.classList.add('popup__submit-button_inactive');
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