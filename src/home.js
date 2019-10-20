import React from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Login from './login'
import Register from './register'
import UserLocalStorage from "./services/userLocalStorage";
const qs = require('querystring')


export default function Home(){
  let userLocalStorage = new UserLocalStorage();
  let history = useHistory();
  function handleClick(username, password) {
    axios.post('http://localhost:4201/login',
      qs.stringify({username: username, password: password}),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((res)=>{
      if(res.data.passport.user.id){
        userLocalStorage.setUserId(res.data.passport.user.id)
        history.push("/user-management");
      }
    });

    const options = {
      headers: {'userid': localStorage.getItem('userid')}
    };
    axios.get('http://localhost:4201/profile', options).then(res=>{
      console.log(res)
    })
  }
  return (
    <div>
      <Login handleClick={handleClick}/>
      <Register/>
    </div>
  )
}