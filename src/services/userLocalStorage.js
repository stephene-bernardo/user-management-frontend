const USERID_PROPERTY = 'userid';
const FIRSTNAME_PROPERTY = 'firstname'
const LASTNAME_PROPERTY = 'lastname'

export default class UserLocalStorage {
  setUserId(id) {
    localStorage.setItem(USERID_PROPERTY, id)
  }
  getUserId(){
    return localStorage.getItem(USERID_PROPERTY)
  }

  setFirstName(firstname) {
    localStorage.setItem(FIRSTNAME_PROPERTY, firstname)
  }
  getFirstName(){
    return localStorage.getItem(FIRSTNAME_PROPERTY)
  }

  setLastName(lastname) {
    localStorage.setItem(LASTNAME_PROPERTY, lastname)
  }
  getLastName(){
    return localStorage.getItem(LASTNAME_PROPERTY)
  }
}