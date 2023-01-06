//открыть попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  closePopupByEscButton(popup);
  closeByClickOnOverlay(popup);
}

//закрыть попап 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  closePopupByEscButton(popup);
  closeByClickOnOverlay(popup);
}

// закрыть попап при нажатии Esc
function closePopupByEscButton(popup) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      closePopup(popup);
    }
  })
}
// закрыть попап при клике на оверлей
function closeByClickOnOverlay(popup) {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup)
    };
  });
}

export { openPopup, closePopup };