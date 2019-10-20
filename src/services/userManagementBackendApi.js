import axios from "axios";
import {BASE_URL} from '../constant'
const qs = require('querystring');

export default class UserManagementBackendApi{

  changePassword(username, password){
    return axios.patch(`${BASE_URL}/change-password`,{username, password});
  }

  login(username, password){
    return axios.post(`${BASE_URL}/login`,
      qs.stringify({username, password}),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
  }

  register(username, firstname, lastname, password){
    return axios.post(`${BASE_URL}/register`,{username, firstname, lastname, password})
  }
}