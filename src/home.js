import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Login from './login'
import Register from './register'
import ModalChangePassword from "./modalChangePassword";
import UserManagementBackendApi from './services/userManagementBackendApi'


export default function Home(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  };
  function refetchdetails() {
    props.refetchUsers();
    props.refetchUserAuth();
  }
  const handleShow = () => setShow(true);
  let history = useHistory();
  let userManagementBackendApi = new UserManagementBackendApi();
  function handleClick(username, password='') {
    return userManagementBackendApi.login(username, password).then((res)=>{
      if(res.data.passport && res.data.passport.user.id) {
          props.changeFirstName(res.data.passport.user.firstName);
          props.changeLastName(res.data.passport.user.lastName);
          history.push("/user-management"); 
      }
    })
  }
  function handleRegister(username, firstname, lastname, password){
    return userManagementBackendApi.register(username, firstname, lastname, password).then(res=> {
      userManagementBackendApi.profile().then(res => {
        if(res.data.passport && res.data.passport.user.firstName){
          props.changeFirstName(res.data.passport.user.firstName);
          props.changeLastName(res.data.passport.user.lastName);
          refetchdetails();
          history.push("/user-management/");
        }
      })
    })
  }
  function greetingPage(){
    if(!props.firstName){
      return (
        <React.Fragment>
          <Register handleClick={handleRegister}/>
          <Login handleClick={handleClick} modalShow={handleShow}/>
          <ModalChangePassword 
          show={show} 
          handleShow={handleShow} 
          handleClose={handleClose}
          refetchdetails={refetchdetails}
          />
        </React.Fragment>
      )
    }
    return (
      <div className="greeting">Welcome {props.firstName} {props.lastName}</div>
    )

  }

  return (
    <div className="containing-div">
      {greetingPage()}
    </div>
  )
}