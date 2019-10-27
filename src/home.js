import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Login from './login'
import Register from './register'
import UserLocalStorage from "./services/userLocalStorage";
import ModalChangePassword from "./modalChangePassword";
import UserManagementBackendApi from './services/userManagementBackendApi'



export default function Home(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let userLocalStorage = new UserLocalStorage();
  let history = useHistory();
  let userManagementBackendApi = new UserManagementBackendApi();
  function handleClick(username, password='') {
    userManagementBackendApi.login(username, password).then((res)=>{
      if(res.data.passport && res.data.passport.user.id) {
        if(!!props.userAuth.userAuths.find(auth => auth.userId === res.data.passport.user.id)){
          userLocalStorage.setUserId(res.data.passport.user.id)
          props.changeFirstName(res.data.passport.user.firstName);
          props.changeLastName(res.data.passport.user.lastName);
          userLocalStorage.setFirstName(res.data.passport.user.firstName)
          userLocalStorage.setLastName(res.data.passport.user.lastName)
          history.push("/user-management");
        }
      }
    });
  }
  function handleRegister(username, firstname, lastname, password){
    userManagementBackendApi.register(username, firstname, lastname, password).then(res=> {
      if(res.data.id){
        userLocalStorage.setUserId(res.data.id)
        props.changeFirstName(firstname);
        props.changeLastName(lastname);
        userLocalStorage.setFirstName(firstname)
        userLocalStorage.setLastName(lastname)
        userLocalStorage.setUserId(res.data.id);
        history.push("/user-management/");
      }
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