//открыть попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEscButton);
  document.addEventListener('click', closeByClickOnOverlay);
}

//закрыть попап 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscButton);
  document.removeEventListener('click', closeByClickOnOverlay);
}

// закрыть попап при нажатии Esc
function closePopupByEscButton(evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// закрыть попап при клике на оверлей
function closeByClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
}

export { openPopup, closePopup };