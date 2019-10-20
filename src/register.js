import React from "react";
import  { useRef  } from 'react'

export default function Register(props){
  const username = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);
  const password = useRef(null);
  function handleClick(event) {
    props.handleClick(
      username.current.value,
      firstname.current.value,
      lastname.current.value,
      password.current.value)
    event.preventDefault();
  }

  return (
    <form className="register" onSubmit={handleClick}>
      <h1>Register User</h1>
      <div className="form-group">
        <label htmlFor="usernameInput">Username</label>
        <input type="text" ref={username} className="form-control" id="usernameInput" placeholder="Username"/>
      </div>
      <div className="form-group">
        <label htmlFor="firsnameInput">Firstname</label>
        <input type="text" ref={firstname} className="form-control" id="firsnameInput" placeholder="Firstname"/>
      </div>
      <div className="form-group">
        <label htmlFor="lastnameInput">Lastname</label>
        <input type="text" ref={lastname} className="form-control" id="lastnameInput" placeholder="Lastname"/>
      </div>
      <div className="form-group">
        <label htmlFor="lastnameInput">Password</label>
        <input type="text" ref={password} className="form-control" id="passwordInput" placeholder="Password"/>
      </div>

      <input  type="submit" value="Register & Login" />
    </form>

  )
}