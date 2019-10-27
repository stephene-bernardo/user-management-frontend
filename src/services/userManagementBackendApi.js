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
      { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
  }

  register(username, firstname, lastname, password){
    return axios.post(`${BASE_URL}/register`,
    qs.stringify({username, password, firstname, lastname}),
    { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  }
  profile(){
    return axios.get(`${BASE_URL}/profile`, { withCredentials: true })
  }
  logout(){
    return axios.get(`${BASE_URL}/logout`, { withCredentials: true })
  }
}