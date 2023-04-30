export default class UserInfo {
  #userName;
  #userJob;

  constructor({ userNameSelector, userJobSelector }) {
    this.#userName = document.querySelector(userNameSelector);
    this.#userJob = document.querySelector(userJobSelector);
  };

  getUserInfo() {
    return {
      name: this.#userName.textContent,
      job: this.#userJob.textContent,
    }
  };

  setUserInfo({ name, job }) {
    this.#userName.textContent = name;
    this.#userJob.textContent = job;
  };
}