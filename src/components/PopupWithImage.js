import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector('.popup__img');
    this._imageTitle = this._popup.querySelector('.popup__img-title');
  }

  // openPopup(imgElement) {
  openPopup({ src, alt }) {
    super.openPopup();

    this._image.setAttribute("src", src);
    this._image.setAttribute("alt", `Изображение ${alt}`);
    this._imageTitle.textContent = alt;
  }
}
