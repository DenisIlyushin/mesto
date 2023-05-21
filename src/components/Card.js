export default class Card {
  #data
  #userID
  #element
  #innerElements
  #handlePopup
  #handleDelete

  constructor({ dataObj, userID, zoomCardCallback, deleteCardCallback }, templateSelector) {
    this.#data = {
      name: dataObj.name,
      link: dataObj.link,
      likes: dataObj.likes.length,
      ownerID: dataObj.owner._id,
    };
    this.#userID = userID;
    this.#element = this.#getTemplateElement(templateSelector);
    this.#innerElements = {
      image: this.#element.querySelector('.mesto__image'),
      title: this.#element.querySelector('.mesto__heading'),
      likeButton: this.#element.querySelector('.mesto__like-button'),
      likeCount: this.#element.querySelector('.mesto__like-count'),
      deleteButton: this.#element.querySelector('.mesto__delete-button'),
    };
    this.#handlePopup = zoomCardCallback;
    this.#handleDelete = deleteCardCallback;
  };

  #getTemplateElement(templateSelector) {
    // возвращает готовый элемент по шаблону
    return document
      .querySelector(templateSelector)
      .content
      .querySelector('.mesto')
      .cloneNode(true);
  };

  #openInPopup() {
    this.#handlePopup(this.#data);
  };

  #toggleLike() {
    // управляет статусом кнопки лайка
    this.#innerElements.likeButton
      .classList.toggle('mesto__like-button_liked');
  }

  #handleCardDelete() {
    this.#handleDelete();
  }

  delete() {
    // удаляет карточку места
    this.#element.remove();
    this.#innerElements = null;
  };

  #setEventsListeners() {
    // добавляет слушателей события к карточке
    this.#innerElements.likeButton
      .addEventListener('click', () => {this.#toggleLike()});
    this.#innerElements.deleteButton
      .addEventListener('click', () => {this.#handleCardDelete()});
    this.#innerElements.image
      .addEventListener('click', () => {this.#openInPopup()});
  }

  make() {
    // возвращает готовый элемент карточки места
    this.#innerElements.image.src = this.#data.link;
    this.#innerElements.image.alt = `Фотография ${this.#data.name}`;
    this.#innerElements.title.textContent = this.#data.name;
    this.#innerElements.likeCount.textContent = this.#data.likes;
    // если не пользователь создал карточку, то удаляем кнопку для удаления
    if (this.#userID !== this.#data.ownerID) {
      this.#innerElements.deleteButton.remove();
    }
    this.#setEventsListeners();
    // обработка карточек с "битыми" картинками.
    this.#innerElements.image.addEventListener('error', (event) => {
      console.log(`Ошибка загрузки ${event.target.src}. Карточка будет удалена.`)
      this.delete()
    })
    return this.#element
  }
}