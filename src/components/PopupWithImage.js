import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.image = this.popup.querySelector('.popup__img');
    this.imageTitle = this.popup.querySelector('.popup__img-title');
  }

  // openPopup(imgElement) {
  openPopup({ src, alt }) {
    super.openPopup();

    console.log(src);
    console.log(alt);
    this.image.setAttribute("src", src);
    this.image.setAttribute("alt", `Изображение ${alt}`);
    this.imageTitle.textContent = alt;
  }

}
