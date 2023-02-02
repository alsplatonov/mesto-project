export default class UserInfo {
  #nameElementSelector;
  #descElementSelector;
  #avatarElementSelector;
  #getProfileInfo;
  constructor(selectors, getProfileInfo, patchProfileInfo) {
    this.#nameElementSelector = document.querySelector(selectors.nameElementSelector);
    this.#descElementSelector = document.querySelector(selectors.descElementSelector);
    this.#avatarElementSelector = document.querySelector(selectors.avatarElementSelector);
    this.#getProfileInfo = getProfileInfo;
  }

  getUserInfo() {
    return this.#getProfileInfo()
  }

  setUserInfo(userData) {
    this.#nameElementSelector.textContent = userData.name;
    this.#descElementSelector.textContent = userData.about;
    this.#avatarElementSelector.src = userData.avatar;
  }
}
