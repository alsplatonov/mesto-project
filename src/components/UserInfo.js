export default class UserInfo {
  #nameElement;
  #descElement;
  #avatarElement;
  #getProfileInfo;
  constructor(selectors, getProfileInfo) {
    this.#nameElement = document.querySelector(selectors.nameElementSelector);
    this.#descElement = document.querySelector(selectors.descElementSelector);
    this.#avatarElement = document.querySelector(selectors.avatarElementSelector);
    this.#getProfileInfo = getProfileInfo;
  }

  getUserInfo() {
    return {
      name:this.#nameElement.textContent,
      about:this.#descElement.textContent
    }
  }

  setUserInfo(userData) {
    this.#nameElement.textContent = userData.name;
    this.#descElement.textContent = userData.about;
    this.#avatarElement.src = userData.avatar;
  }
}
