import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserManagement from "./userManagement";
import Home from "./home"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user-management">
          <UserManagement></UserManagement>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
