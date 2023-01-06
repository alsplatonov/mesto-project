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


// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_inactive',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_active'
// });

export {enableValidation};
