import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formHandler) {
    super(popupSelector);
    this._formHandler = formHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }


  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formHandler(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setInputValues(data) {
    this._inputList.forEach(input => input.value = data[input.name])
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
}