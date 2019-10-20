import React from "react";
import  { useRef  } from 'react'

export default function Login(props){
  const username = useRef(null);
  const password = useRef(null);
  function handleClick(event) {
    props.handleClick(username.current.value, password.current.value)
    event.preventDefault();
  }

  return (
    <form onSubmit={handleClick}>
      <label>
        username:
        <input ref={username} type="text" name="username" />
      </label>
      <label>
        password:
        <input type="text"  ref={password} name="password" />
      </label>
      <input  type="submit" value="Login" />
    </form>

  )
}