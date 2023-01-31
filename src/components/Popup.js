import {closePopup} from "./modal";

export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.buttonClose = this.popup.querySelector('.popup__close-button')
  }

  openPopup() {
    this.popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  closePopup() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this.popup.addEventListener('click', this._handleOverlayClose.bind(this))
    this.buttonClose.addEventListener('click', this.closePopup.bind(this))
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.closePopup();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  }
}
