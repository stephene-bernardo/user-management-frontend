import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserManagement from "./userManagement";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user-management">
          <UserManagement></UserManagement>
        </Route>
        <Route path="/">
          <h1>HOME</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
