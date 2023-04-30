export default class Popup {
  #popup

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
  };

  #handleCloseOnEsc(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  close() {
    this.#popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this.#handleCloseOnEsc);
  };

  open() {
    this.#popup.classList.add('popup_opened');
    document.addEventListener('keyup', this.#handleCloseOnEsc);
  };

  setEventListeners() {
    this.#popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened')
        || event.target.classList.contains('popup__close-button')) {
        this.close()
      }
    });
  };
}