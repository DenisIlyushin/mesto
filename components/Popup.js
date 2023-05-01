export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };

  #handleCloseOnEsc(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this.#handleCloseOnEsc);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this.#handleCloseOnEsc);
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened')
        || event.target.classList.contains('popup__close-button')) {
        this.close()
      }
    });
  };
}