import React from "react";
import  { useRef  } from 'react'
import Button from 'react-bootstrap/Button';

export default function Login(props){
  const username = useRef(null);
  const password = useRef(null);
  function handleClick(event) {
    props.handleClick(username.current.value, password.current.value)
    event.preventDefault();
  }

  return (
    <form  className="signin" onSubmit={handleClick}>

      <h1>Sign In</h1>
      <div className="form-group">
        <label htmlFor="usernameInput">Username</label>
        <input type="text" ref={username} className="form-control" id="usernameInput" placeholder="Username"/>
      </div>

      <div className="form-group">
        <label htmlFor="passwordInput">Password</label>
        <input type="text" ref={password} className="form-control" id="passwordInput" placeholder="Password"/>
      </div>

      <input  type="submit" value="Login" />
      <a onClick={props.modalShow}> Change Password</a>
    </form>

  )
}