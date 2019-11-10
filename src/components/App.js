import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserManagement from "./userManagement";
import Home from "./home"
import {useQuery} from "@apollo/react-hooks";
import {FETCH_USER_AUTH, FETCH_USERS} from "../gqlquery"
import UserManagementBackendApi from '../services/userManagementBackendApi'


function App() {
  const {data: userAuth, refetch: refetchUserAuth} = useQuery(FETCH_USER_AUTH, {pollInterval: 1000*10});
  const {data: fetchUsers, refetch: refetchUsers} = useQuery(FETCH_USERS, {pollInterval: 1000*10});

  let userManagementBackendApi = new UserManagementBackendApi();
  let [firstName ,setFirstName] = useState('');
  let [lastName ,setLastName] = useState('');
  userManagementBackendApi.profile().then(res => {
    if(res && res.data && res.data.passport && res.data.passport.user.firstName){
      setFirstName(res.data.passport.user.firstName);
      setLastName(res.data.passport.user.lastName);
    }
  })

  function onLogout(){
    setFirstName('')
    setLastName('')
    userManagementBackendApi.logout();
  }
  let greetings= firstName && lastName? `${firstName} ${lastName}`: 'Guest'
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to='/' className="navbar-brand">UM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item" >
              <Link className="nav-link"  to='/user-management'>Manage User</Link>
            </li>
          </ul>
          <div >Hello <b>{greetings}</b></div>
          {
            firstName && lastName? (
              <div className='nav-item'>
                <Link className="nav-link" to='/' onClick={onLogout}>Logout</Link>
              </div>
            ): null
          }
        </div>
      </nav>
      <Switch>
        <Route path="/user-management">
          <UserManagement userAuth={userAuth} users={fetchUsers}></UserManagement>
        </Route>
        <Route path="/">
          <Home userAuth={userAuth} 
                changeFirstName={setFirstName} 
                changeLastName={setLastName}
                firstName={firstName}
                refetchUserAuth={refetchUserAuth}
                refetchUsers={refetchUsers}
                lastName={lastName}>
          </Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
