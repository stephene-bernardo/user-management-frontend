import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useRef, useState} from "react";
import axios from "axios";

export default function ModalChangePassword (props){
  const username = useRef(null);
  const password = useRef(null);
  const password2 = useRef(null);
  let [errorMessage, setErrorMessage] = useState('')

  function handleClick(event){
    if(!username.current.value || !password.current.value || !password2.current.value){
      setErrorMessage('Cannot Submit Empty Fields')
    } else if(password.current.value !== password2.current.value) {
      setErrorMessage('Password does not match')
    }else {
      axios.patch('http://localhost:4201/change-password',{
        "username": username.current.value,
        "password": password.current.value,
      })
      props.handleClose()
      event.preventDefault();
    }
  }
  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <form onSubmit={handleClick}>
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input type="text" ref={username} className="form-control" id="usernameInput" placeholder="Username"/>
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input type="text" ref={password} className="form-control" id="passwordInput" placeholder="Password"/>
            </div>
            <div className="form-group">
              <label htmlFor="password2Input">Password</label>
              <input type="text" ref={password2} className="form-control" id="password2Input" placeholder="password2"/>
            </div>
            <p>{errorMessage}</p>
          </form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Change Password
        </Button>
      </Modal.Footer>
    </Modal>
  )
}