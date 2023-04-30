export default class UserInfo {
  #userName;
  #userJob;

  constructor({ userNameSelector, userJobSelector }) {
    this.#userName = document.querySelector(userNameSelector);
    this.#userJob = document.querySelector(userJobSelector);
  };
  // todo обновление значений textcontent => #data?
  //  https://app.pachca.com/chats/3916083?message=48620375
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