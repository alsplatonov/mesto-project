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


const container = document.querySelector('.container');
const btnOpenEditCardForm = container.querySelector('.profile__edit-button');
const btnOpenAddCardForm = container.querySelector('.profile__add-button');
const buttonsForClosingPopup = document.querySelectorAll('.popup__close-button');
const btnCloseEditCardForm = document.querySelector('.popup__close-button_profile');
const btnCloseAddCardForm = document.querySelector('.popup__close-button_card');
const btnCloseImgForm = document.querySelector('.popup__close-button_image');
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
const submitBtnMesto = document.querySelector('#submitButtonMesto');


export {
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
};