const USERID_PROPERTY = 'userid';

export default class UserLocalStorage {
  setUserId(id) {
    localStorage.setItem(USERID_PROPERTY, id)
  }
  getUserId(){
    localStorage.getItem(USERID_PROPERTY)
  }
}