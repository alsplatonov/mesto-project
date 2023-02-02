export default class UserInfo {
  constructor(selectors, getProfileInfo, patchProfileInfo) {
    // this.nameElementSelector = selectors.nameElementSelector;
    // this.descElementSelector = selectors.descElementSelector;
    this.nameElementSelector = document.querySelector(selectors.nameElementSelector);
    this.descElementSelector = document.querySelector(selectors.descElementSelector);
    this.avatarElementSelector = document.querySelector(selectors.avatarElementSelector);
    this.getProfileInfo = getProfileInfo;
    this.patchProfileInfo = patchProfileInfo;
  }

  getUserInfo() {
    return this.getProfileInfo()
  }

  // setUserInfo(userData) {
  //   this.patchProfileInfo(userData)
  // }

  setUserInfo(userData) {
    this.nameElementSelector.textContent = userData.name;
    this.descElementSelector.textContent = userData.about;
    this.avatarElementSelector.src = userData.avatar;
  }
}
