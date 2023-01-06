import './src/index.css'; // добавьте импорт главного файла стилей 

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10



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

//открыть попап

function openPopup(popup) {

  popup.classList.add("popup_opened");

  closePopupByEscButton(popup);
  closeByClickOnOverlay(popup);
}

//закрыть попап 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  closePopupByEscButton(popup);
  closeByClickOnOverlay(popup);
}

// закрыть попап при нажатии Esc
function closePopupByEscButton(popup) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      closePopup(popup);
    }
  })
}
// закрыть попап при клике на оверлей
function closeByClickOnOverlay(popup) {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup)
    };
  });
}


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




const showInputError = (formElement, inputElement, errorMessage, validateSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validateSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateSelectors.errorClass);
};

const hideInputError = (formElement, inputElement, validateSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validateSelectors.inputErrorClass);
  errorElement.classList.remove(validateSelectors.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, validateSelectors) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validateSelectors);
  } else {
    hideInputError(formElement, inputElement, validateSelectors);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};


const toggleButtonState = (inputList, buttonElement, validateSelectors) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(validateSelectors.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(validateSelectors.inactiveButtonClass);
  }
};

// Добавление слушателей к инпутам форм для управления состоянием кнопки
const setEventListeners = (formElement, validateSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(validateSelectors.inputSelector));
  const buttonElement = formElement.querySelector(validateSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validateSelectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // hideInputError(formElement, inputElement, validateSelectors);
      isValid(formElement, inputElement, validateSelectors);
      toggleButtonState(inputList, buttonElement, validateSelectors);
    });
  });
};


const enableValidation = (validateSelectors) => {
  const formList = Array.from(document.querySelectorAll(validateSelectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validateSelectors);
  });
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});