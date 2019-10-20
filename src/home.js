import React, {useState} from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Login from './login'
import Register from './register'
import UserLocalStorage from "./services/userLocalStorage";
import Button from 'react-bootstrap/Button';
import ModalChangePassword from "./modalChangePassword";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const qs = require('querystring');
const FETCH_USER_AUTH = gql `{userAuths {userId}}`;


export default function Home() {
  const {data : user_auths} = useQuery(FETCH_USER_AUTH);
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
        if(!!user_auths.userAuths.find(auth => auth.userId === res.data.passport.user.id)){
          userLocalStorage.setUserId(res.data.passport.user.id)
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
        history.push("/user-management");
      }
    })
  }

  return (
    <div className="containing-div">
      <Register  handleClick={handleRegister}/>
      <Login handleClick={handleClick} modalShow={handleShow}/>

      <ModalChangePassword show={show} handleShow={handleShow} handleClose={handleClose}/>
    </div>
  )
}