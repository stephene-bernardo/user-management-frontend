import Modal from "react-bootstrap/Modal";
import React, {useRef, useState} from "react";
import axios from "axios";
import UserManagementBackendApi from './services/userManagementBackendApi'

export default function ModalChangePassword (props){
  const username = useRef(null);
  const password = useRef(null);
  const password2 = useRef(null);
  let [errorMessage, setErrorMessage] = useState('');
  let userManagementBackendApi = new UserManagementBackendApi();

  function handleClick(event){
    if(!username.current.value || !password.current.value || !password2.current.value){
      setErrorMessage('Cannot Submit Empty Fields')
    } else if(password.current.value !== password2.current.value) {
      setErrorMessage('Password does not match')
    }else {
      userManagementBackendApi.changePassword(username, password)
      props.handleClose();
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
              <label htmlFor="usernameInputModal">Username</label>
              <input type="text" ref={username}
                     className="form-control"
                     id="usernameInputModal"
                     placeholder="Username"/>
            </div>
            <div className="form-group">
              <label htmlFor="passwordInputModal">Password</label>
              <input type="password" ref={password}
                     className="form-control"
                     id="passwordInputModal"
                     placeholder="Password"/>
            </div>
            <div className="form-group">
              <label htmlFor="password2InputModal">Password</label>
              <input type="password" ref={password2}
                     className="form-control"
                     id="password2InputModal"
                     placeholder="Password"/>
            </div>
            <p className='errormessage'>{errorMessage}</p>
          </form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.handleClose}> Close</button>
        <button onClick={handleClick}>Change Password</button>
      </Modal.Footer>
    </Modal>
  )
}