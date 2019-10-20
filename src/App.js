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
import UserLocalStorage from "./services/userLocalStorage"


function App() {
  let userLocalStorage = new UserLocalStorage();
  let [firstName ,setFirstName] = useState(userLocalStorage.getFirstName);
  let [lastName ,setLastName] = useState(userLocalStorage.getLastName);
  function onLogout(){
    setFirstName('')
    setLastName('')
    userLocalStorage.setLastName('')
    userLocalStorage.setFirstName('')
    userLocalStorage.setUserId('')
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
          <UserManagement></UserManagement>
        </Route>
        <Route path="/">
          <Home changeFirstName={setFirstName} changeLastName={setLastName}></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
