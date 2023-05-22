export default class Card {
  #data
  #userID
  #element
  #innerElements
  #handlePopup
  #handleDelete
  #likeCallback
  #dislikeCallback

  constructor(
    {dataObj, userID, zoomCardCallback, deleteCardCallback, likeCallback, dislikeCallback },
    templateSelector
  ) {
    this.#data = {
      name: dataObj.name,
      link: dataObj.link,
      likes: dataObj.likes,
      ownerID: dataObj.owner._id,
      cardID: dataObj._id
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
    this.#likeCallback = likeCallback;
    this.#dislikeCallback = dislikeCallback;
  };

  #getTemplateElement(templateSelector) {
    return document
      .querySelector(templateSelector)
      .content
      .querySelector('.mesto')
      .cloneNode(true);
  };

  #openInPopup() {
    this.#handlePopup(this.#data);
  };

  #handleCardDelete() {
    this.#handleDelete();
  };

  #handleLike() {
    if (this.#innerElements.likeButton.classList.contains('mesto__like-button_liked')) {
      this.#dislikeCallback(this.#data.cardID);
      this.#innerElements.likeButton.classList.remove('mesto__like-button_liked');
    } else {
      this.#likeCallback(this.#data.cardID);
      this.#innerElements.likeButton.classList.add('mesto__like-button_liked');
    }
  };

  #setEventsListeners() {
    this.#innerElements.likeButton
      .addEventListener('click', () => {this.#handleLike()});
    this.#innerElements.image
      .addEventListener('click', () => {this.#openInPopup()});
    if (this.#userID !== this.#data.ownerID) {
      this.#innerElements.deleteButton.remove();
      this.#innerElements.deleteButton = null;
    } else {
      this.#innerElements.deleteButton
        .addEventListener('click', () => {
          this.#handleCardDelete();
        });
    }
  };

  getID() {
    return this.#data.cardID
  }

  delete() {
    this.#element.remove();
    this.#innerElements = null;
  };

  setLikes({ likes }) {
    this.#innerElements.likeCount.textContent = likes.length
    likes.forEach((like) => {
      if (like._id === this.#userID) {
        this.#innerElements.likeButton.classList.add('mesto__like-button_liked');
      }
    })
  };

  make() {
    this.#innerElements.image.src = this.#data.link;
    this.#innerElements.image.alt = `Фотография ${this.#data.name}`;
    this.#innerElements.title.textContent = this.#data.name;
    this.setLikes(this.#data);
    this.#setEventsListeners();

    // обработка карточек с "битыми" картинками, добавил сам
    this.#innerElements.image.addEventListener('error', (event) => {
      console.log(`Ошибка загрузки ${event.target.src}. Карточка будет удалена.`)
      this.delete()
    });
    return this.#element
  };
}