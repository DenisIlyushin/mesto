export default class Api {
  #baseUrl;
  #headers;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  };

  #handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  };

  #handleError(error) {
    return error
  };

  getCards() {
    return fetch(`${
        this.#baseUrl}/cards`,
      {headers: this.#headers}
    )
      .then(this.#handleResponse);
  };

  getUserInfo() {
    return fetch(
      `${this.#baseUrl}/users/me`,
      {headers: this.#headers}
    )
      .then(this.#handleResponse)
      .catch(this.#handleError);
  };

  setUserInfo({name, about}) {
    return fetch(`${this.#baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then(this.#handleResponse)
  };

  setUserAvatar({avatar}) {
    return fetch(`${this.#baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    }).then(this.#handleResponse)
  }
}

// function test() {
//   // попытка unit-теста
//   const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
//     headers: {
//       authorization: 'dc6a4a93-0c58-4e81-85df-4663aee25693',
//       'Content-Type': 'application/json',
//     },
//   })
//
//   Promise.all([
//     api.getUserInfo(),
//     api.setUserInfo({
//       userName: 'Ден Илюшин',
//       userJob: 'Студент Я.Практикума'
//     }),
//     // api.getCards(),
//   ])
//     .then(console.log)
//     .catch(console.log)
// }
//
// test()
