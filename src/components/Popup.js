
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-button')
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this))
    this._buttonClose.addEventListener('click', this.closePopup.bind(this))
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.closePopup();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  }
}
