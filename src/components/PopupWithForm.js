import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formHandler, profilePopup) {
    super(popupSelector);

    this._formHandler = formHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._profilePopup = profilePopup
    this._profileData = null;
  }


  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formHandler(this._getInputValues());
    });
  }

  openPopup(profileData) {
    super.openPopup();
    this._form.reset();
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
