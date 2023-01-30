export default class FormValidator {
  constructor(validateSelectors, formElement) {
    //this.#formSelector = validateSelectors.formSelector;
    this.#inputSelector = validateSelectors.inputSelector;
    this.#submitButtonSelector = validateSelectors.submitButtonSelector;
    this.#inactiveButtonClass = validateSelectors.inactiveButtonClass;
    this.#inputErrorClass = validateSelectors.inputErrorClass;
    this.#errorClass = validateSelectors.errorClass;

    this.#formElement = document.querySelector(formElement);
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

  #hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };


  #toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this.#hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(this.#inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.#inactiveButtonClass);
    }
  };

  // Добавление слушателей к инпутам формы для управления состоянием кнопки
  #setEventListeners() {
    const inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
    const buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);
    this.#toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#isValid(inputElement);
        this.#toggleButtonState(inputList, buttonElement);
      });
    });
  };


  enableValidation() { //Для каждой проверяемой формы будем создавать свой экземпляр класса FormValidator
    this.#setEventListeners();
  }


}