import React, {useState} from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Login from './login'
import Register from './register'
import UserLocalStorage from "./services/userLocalStorage";
import ModalChangePassword from "./modalChangePassword";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
const qs = require('querystring');
const FETCH_USER_AUTH = gql `{userAuths {userId}}`;


export default function Home(props) {
  const {data} = useQuery(FETCH_USER_AUTH,  {pollInterval: 1});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let userLocalStorage = new UserLocalStorage();
  let history = useHistory();
  function handleClick(username, password='') {
    axios.post('http://localhost:4201/login',
      qs.stringify({username: username, password: password}),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((res)=>{
      if(res.data.passport && res.data.passport.user.id) {
        if(!!data.userAuths.find(auth => auth.userId === res.data.passport.user.id)){
          userLocalStorage.setUserId(res.data.passport.user.id)
          props.changeFirstName(res.data.passport.user.firstName);
          props.changeLastName(res.data.passport.user.lastName);
          userLocalStorage.setFirstName(res.data.passport.user.firstName)
          userLocalStorage.setLastName(res.data.passport.user.lastName)
          history.push("/user-management");
        }
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
        props.changeFirstName(firstname);
        props.changeLastName(lastname);
        userLocalStorage.setFirstName(firstname)
        userLocalStorage.setLastName(lastname)
        userLocalStorage.setUserId(res.data.id);
        history.push("/user-management/");
      }
    })
  }

  return (
    <div className="containing-div">
      <Register handleClick={handleRegister}/>
      <Login handleClick={handleClick} modalShow={handleShow}/>
      <ModalChangePassword show={show} handleShow={handleShow} handleClose={handleClose}/>
    </div>
  )
}