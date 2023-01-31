export default class UserInfo {
  constructor(selectors, getProfileInfo, patchProfileInfo) {
    this.nameElementSelector = selectors.nameElementSelector
    this.descElementSelector = selectors.descElementSelector
    this.getProfileInfo = getProfileInfo
    this.patchProfileInfo = patchProfileInfo
  }

  getUserInfo() {
    return this.getProfileInfo()
  }

  setUserInfo(userData) {
    this.patchProfileInfo(userData)
  }
}
