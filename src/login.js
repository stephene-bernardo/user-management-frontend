import React , {useState} from "react";
import  { useRef  } from 'react'

export default function Login(props){
  const [errorMessage, setErrorMessage] = useState('');
  const username = useRef(null);
  const password = useRef(null);
  function handleClick(event) {
    props.handleClick(username.current.value, password.current.value).catch((err)=>{
      if (err.response.status === 401){
        setErrorMessage('username or password is incorrect')
      }
    })
    event.preventDefault();
  }

  return (
    <form  className="signin" onSubmit={handleClick}>

      <h1>Sign In</h1>
      <div className="form-group">
        <label htmlFor="usernameInput">Username</label>
        <input type="text" 
        ref={username} 
        className="form-control" 
        id="usernameInput" 
        onChange={()=>{setErrorMessage('')}}
        placeholder="Username"/>
      </div>

      <div className="form-group">
        <label htmlFor="passwordInput">Password</label>
        <input type="password" ref={password}
         className="form-control" 
         id="passwordInput" 
         onChange={()=>{setErrorMessage('')}}
         placeholder="Password"/>
        <p className="error-message">{errorMessage}</p>
      </div>

      <div>
      <input  type="submit" value="Login" />
      <button style={{marginLeft: 10 + 'px'}} onClick={props.modalShow}> Change Password</button>
      </div>

    </form>

  )
}