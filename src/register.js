import React from "react";
import  { useRef  } from 'react'

export default function Register(props){
  const username = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);
  const password = useRef(null);
  function handleClick(event) {
    // props.handleClick(username.current.value, password.current.value)
    event.preventDefault();
  }

  return (
    <form onSubmit={handleClick}>
      <label>
        username:
        <input ref={username} type="text" name="username" />
      </label>
      <label>
        firsname:
        <input ref={firstname} type="text" name="username" />
      </label>
      <label>
        lastname:
        <input ref={lastname} type="text" name="username" />
      </label>
      <label>
        password:
        <input type="text"  ref={password} name="password" />
      </label>

      <input  type="submit" value="Register & Login" />
    </form>

  )
}