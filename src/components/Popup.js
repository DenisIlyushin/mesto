export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleCloseOnEsc = this._handleCloseOnEsc.bind(this);
  };

  _handleCloseOnEsc(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleCloseOnEsc);
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleCloseOnEsc);
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