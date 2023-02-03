import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formHandler, profilePopup) {
    super(popupSelector);

    this.formHandler = formHandler;
    this.form = this.popup.querySelector('.popup__form');
    this._inputList = this.form.querySelectorAll('.popup__input');
    this._profilePopup = profilePopup
    this._profileData = null;
  }


  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.formHandler(this._getInputValues());
    });
  }

  openPopup(profileData) {
    super.openPopup();

    if (this._profilePopup) {
      this._profileData = profileData

      this._inputList.forEach(input => input.value = this._profileData[input.name])
    }
  }

  closePopup() {
    super.closePopup();

    if (this._profilePopup) {
      this._inputList.forEach(input => input.value = this._profileData[input.name])
    } else {
      this._reset()
    }
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _reset() {
    this._inputList.forEach(input => input.value = '')
  }
}
