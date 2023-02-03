export default class FormValidator {
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #formElement;
  #buttonElement;
  #inputList;

  constructor(validateSelectors, formElement) {
    this.#inputSelector = validateSelectors.inputSelector;
    this.#submitButtonSelector = validateSelectors.submitButtonSelector;
    this.#inactiveButtonClass = validateSelectors.inactiveButtonClass;
    this.#inputErrorClass = validateSelectors.inputErrorClass;
    this.#errorClass = validateSelectors.errorClass;
    this.#formElement = formElement;
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.#inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#errorClass);
  };

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.#inputErrorClass);
    errorElement.classList.remove(this.#errorClass);
    errorElement.textContent = '';
  };

  #isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  };

  #hasInvalidInput() {
    // проходим по этому массиву методом some
    return this.#inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };


  #toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this.#hasInvalidInput()) {
      // сделай кнопку неактивной
      this.#buttonElement.disabled = true;
      this.#buttonElement.classList.add(this.#inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      this.#buttonElement.disabled = false;
      this.#buttonElement.classList.remove(this.#inactiveButtonClass);
    }
  };

  // Добавление слушателей к инпутам формы для управления состоянием кнопки
  #setEventListeners() {
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
    this.#buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);
    this.#toggleButtonState();
    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#isValid(inputElement);
        this.#toggleButtonState();
      });
    });
  };


  //сброс валидации формы
  resetValidation() {
    this.#toggleButtonState();
  }

  enableValidation() { //Для каждой проверяемой формы будем создавать свой экземпляр класса FormValidator
    this.#setEventListeners();
  }
}