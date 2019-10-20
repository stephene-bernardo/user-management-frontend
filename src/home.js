import React from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Login from './login'
import Register from './register'
import UserLocalStorage from "./services/userLocalStorage";
const qs = require('querystring')


export default function Home() {
  let userLocalStorage = new UserLocalStorage();
  let history = useHistory();
  function handleClick(username, password) {
    axios.post('http://localhost:4201/login',
      qs.stringify({username: username, password: password}),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((res)=>{
        console.log(res)
      if(res.data.passport.user.id) {
        userLocalStorage.setUserId(res.data.passport.user.id)
        history.push("/user-management");
      }
    });
  }
  function handleRegister(username, firstname, lastname, password){
    axios.post('http://localhost:4201/register',{
      "username": username,
      "lastname": firstname,
      "firstname": lastname,
      "password": password
    }).then(res=> {
      if(res.data.id){
        userLocalStorage.setUserId(res.data.id)
        history.push("/user-management");
      }
    })
  }

  return (
    <div>
      <Login handleClick={handleClick}/>
      <Register handleClick={handleRegister}/>
    </div>
  )
}