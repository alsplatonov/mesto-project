import '../pages/index.css';
import {
  initialCards
  , container
  , btnOpenEditCardForm
  , btnOpenEditAvatar
  , btnOpenAddCardForm
  , profileAvatar
  , buttonsForClosingPopup
  , btnCloseEditCardForm
  , btnCloseEditAvatar
  , btnCloseAddCardForm
  , btnCloseImgForm
  , elementTemplate
  , popupImgButton
  , formElementEdit
  , formAvatarEdit
  , formElementAdd
  , formElementImg
  , imgSrc
  , imgTitle
  , formElements
  , nameInput
  , jobInput
  , titleInput
  , linkInput
  , linkInputAvatar
  , profileTitle
  , profileSubtitle
  , elements
  , submitBtnMesto
  , submitBtnProfile
  , submitBtnAvatar
} from './constants.js';

import { enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { addElement, createCard, changeLike } from './card.js';

import {
  getUserInfo
  , getInitialCards
  , patchProfileInfo
  , postCard
  , deleteUserCard
  , putLiketoCard
  , deleteLike
  , changeUserAvatar
} from './serverApi.js';

let profileGlobal;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // загрузка инфо о пользователе с сервера 
    profileGlobal = userInfo;

    profileTitle.textContent = userInfo.name;
    profileSubtitle.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;

    // загрузка карточек c сервера
    // console.log('me = ' + userInfo._id);
    initialCards.forEach(function (item) {
      elements.append(createCard(userInfo._id, item));
      // elements.append(createCard(userInfo._id, item, hundleLikeCard));
    });
  })
  .catch((error) => { //обработка ошибок
    console.log(error);
  })

function openEditForm() { //открыть форму редактирования профиля
  openPopup(formElementEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openEditAvatar() { //открыть форму редактирования аватара
  openPopup(formAvatarEdit);

}

function openAddForm() { //открыть форму добавления карточки
  openPopup(formElementAdd);
  titleInput.value = '';
  linkInput.value = '';
  submitBtnMesto.disabled = true;
  submitBtnMesto.classList.add('popup__submit-button_inactive');
}

//обработчики форм
function submitEditProfileForm(evt) { //редактирование профиля
  evt.preventDefault();
  submitBtnProfile.textContent = 'Сохранение...';
  patchProfileInfo(nameInput.value, jobInput.value)
    .then((newProfile) => {
      profileTitle.textContent = newProfile.name;
      profileSubtitle.textContent = newProfile.about;
      closePopup(formElementEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      submitBtnProfile.textContent = 'Сохранить';
    });
}


function submitEditAvatarForm(evt) { //редактирование аватара
  evt.preventDefault();
  submitBtnAvatar.textContent = 'Сохранение...';
  // console.log(linkInputAvatar.value);
  changeUserAvatar(linkInputAvatar.value)
    .then((newAvatar) => {
      profileAvatar.src = newAvatar.avatar;
      profileAvatar.alt = newAvatar.avatar;
      closePopup(formAvatarEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      submitBtnAvatar.textContent = 'Сохранить';
    });
}


// function submitAddCardForm(evt) {  //добавление карточки
//   evt.preventDefault();
//   submitBtnMesto.textContent = 'Создание...';
//   postCard(titleInput.value, linkInput.value)
//     .then((newCard) => {
//       elements.prepend(createCard(profileGlobal._id, newCard));
//       closePopup(formElementAdd);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => {
//       submitBtnMesto.textContent = 'Создать';
//     });
// }

function submitAddCardForm(evt) {  //добавление карточки
  evt.preventDefault();
  submitBtnMesto.textContent = 'Создание...';
  postCard(titleInput.value, linkInput.value)
    .then((newCard) => {
      elements.prepend(createCard(profileGlobal._id, newCard, hundleLikeCard));
      closePopup(formElementAdd);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      submitBtnMesto.textContent = 'Создать';
    });
}

 function handleLikeCard(status, card_id, evt, likesAmount) {
  !status ? putLiketoCard(card_id)
    .then((res) => {
      changeLike(res, evt, status, likesAmount)
    })
    .catch((error) => {
      console.log(error);
    })
    : deleteLike(card_id)
      .then((res) => {
        changeLike(res, evt, status, likesAmount)
      })
      .catch((error) => {
        console.log(error);
      })
}

function handleDeleteCard(card_id, deleteButton) {
  deleteUserCard(card_id)
    .then(() => {
      const listItem = deleteButton.closest('.element');
        listItem.remove();
    })
    .catch((error) => {
      console.log(error);
    })
}


btnOpenEditCardForm.addEventListener('click', openEditForm); //отслеживаем клик кнопки редактировать профиль

btnOpenEditAvatar.addEventListener('click', openEditAvatar); //отслеживаем клик кнопки редактировать аватар

btnOpenAddCardForm.addEventListener('click', openAddForm); //отслеживаем клик кнопки добавить

//закрыть попапы
btnCloseEditCardForm.addEventListener('click', function () { //Форма редактирования профиля
  closePopup(formElementEdit);
});

btnCloseEditAvatar.addEventListener('click', function () { //Форма редактирования аватара
  closePopup(formAvatarEdit);
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

formAvatarEdit.addEventListener('submit', submitEditAvatarForm);

formElementAdd.addEventListener('submit', submitAddCardForm);


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});


export {handleLikeCard, handleDeleteCard};