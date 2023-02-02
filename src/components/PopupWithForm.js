import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formHandler) {
    super(popupSelector);

    this.formHandler = formHandler;
    this.form = this.popup.querySelector('.popup__form');
    this._inputList = this.form.querySelectorAll('.popup__input');
    this.initialValues = null;
  }


  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.formHandler(this._getInputValues());
    });
  }

  openPopup() {
    super.openPopup();
    
    this.initialValues = this._getInputValues()
  }

  closePopup() {
    super.closePopup();
    this._inputList.forEach(input => input.value = this.initialValues[input.name])
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
}
