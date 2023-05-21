export default class UserInfo {
  #userName;
  #userJob;
  #userAvatar;

  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this.#userName = document.querySelector(userNameSelector);
    this.#userJob = document.querySelector(userJobSelector);
    this.#userAvatar = document.querySelector(userAvatarSelector);
    console.log(this.#userAvatar)
  };

  getUserInfo() {
    return {
      name: this.#userName.textContent,
      job: this.#userJob.textContent,
      avatar: this.#userAvatar.src
    }
  };

  setUserInfo({ name, job, avatar }) {
    this.#userName.textContent = name;
    this.#userJob.textContent = job;
    this.#userAvatar.src = avatar;
  };
}