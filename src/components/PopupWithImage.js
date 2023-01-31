import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.image = this.popup.querySelector('.popup__img')
    this.imageTitle = this.popup.querySelector('.popup__img')
  }

  openPopup(imgElement) {
    super.openPopup();

    this.image.setAttribute("src", imgElement.src);
    this.image.setAttribute("alt", `Изображение ${imgElement.alt}`);
    this.imageTitle.textContent = imgElement.alt;
  }
}
