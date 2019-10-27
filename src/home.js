import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Login from './login'
import Register from './register'
import ModalChangePassword from "./modalChangePassword";
import UserManagementBackendApi from './services/userManagementBackendApi'


export default function Home(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();
  let userManagementBackendApi = new UserManagementBackendApi();
  function handleClick(username, password='') {
    userManagementBackendApi.login(username, password).then((res)=>{
      if(res.data.passport && res.data.passport.user.id) {
        if(!!props.userAuth.userAuths.find(auth => auth.userId === res.data.passport.user.id)){
          userManagementBackendApi.profile().then(res => {
            if(res.data.passport && res.data.passport.user.firstName){
              props.changeFirstName(res.data.passport.user.firstName);
              props.changeLastName(res.data.passport.user.lastName);
            }
          })
          history.push("/user-management");
         
        }
      }
    });
  }
  function handleRegister(username, firstname, lastname, password){
    userManagementBackendApi.register(username, firstname, lastname, password).then(res=> {
      userManagementBackendApi.profile().then(res => {
        if(res.data.passport && res.data.passport.user.firstName){
          props.changeFirstName(res.data.passport.user.firstName);
          props.changeLastName(res.data.passport.user.lastName);
          history.push("/user-management/");
        }
      })
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