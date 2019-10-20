import axios from "axios";
const qs = require('querystring');

export default class UserManagementBackendApi{
  constructor(){
    this.baseUrl = 'http://localhost:4201'
  }

  changePassword(username, password){
    return axios.patch(`${this.baseUrl}/change-password`,{username, password});
  }

  login(username, password){
    return axios.post(`${this.baseUrl}/login`,
      qs.stringify({username, password}),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
  }

  register(username, firstname, lastname, password){
    return axios.post(`${this.baseUrl}/register`,{username, firstname, lastname, password})
  }
}