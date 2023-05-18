class Api {
  #baseUrl;
  #headers;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  }

  #handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }

  #handleError(error) {
    return error
  }

  getUserInfo() {
    return fetch(
      `${this.#baseUrl}/users/me`,
      {headers: this.#headers}
    )
      .then(this.#handleResponse)
      .catch(this.#handleError);
  }

  // brokenGetUserInfo() {
  //   return fetch(
  //     `${this.#baseUrl}/users/mer`,
  //     {headers: this.#headers}
  //   )
  //     .then(this.#handleResponse)
  //     .catch(this.#handleError);
  // }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'dc6a4a93-0c58-4e81-85df-4663aee25693',
    'Content-Type': 'application/json',
  },
})

api.getUserInfo()
  .then(console.log)
  .catch(console.log)

// api.brokenGetUserInfo()
//   .then((userInfo) => {
//     console.log(userInfo)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
