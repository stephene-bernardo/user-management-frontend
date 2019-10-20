import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useRef} from "react";
import axios from "axios";

export default function ModalChangePassword (props){
  const username = useRef(null);
  const password = useRef(null);
  const password2 = useRef(null);
  function handleClick(event){
    // props.handleClick(
    //   username.current.value,
    //   password.current.value,
    //   password2.current.value,)

    axios.patch('http://localhost:4201/change-password',{
      "username": username.current.value,
      "password": password.current.value,
    })
    console.log('asdfsd')
    event.preventDefault();
  }
  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>

          <form onSubmit={handleClick}>
            <label>
              username:
              <input ref={username} type="text" name="username" />
            </label>
            <label>
              password:
              <input ref={password} type="text" name="password" />
            </label>
            <label>
              Re-type password:
              <input ref={password2} type="text" name="password2" />
            </label>
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