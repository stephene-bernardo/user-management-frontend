import React from 'react';
import {useMutation} from "@apollo/react-hooks";

import  { useRef } from 'react'
import User from "./user";
import { useHistory } from "react-router-dom";
import UserLocalStorage from "./services/userLocalStorage";
import {FETCH_USERS, 
  CREATE_USER, 
  DELETE_USER, UPDATE_USER,
  DELETE_USER_AUTH, 
  FETCH_USER_AUTH} from './gqlquery'
import UserManagementBackendApi from './services/userManagementBackendApi'

export default function UserManagement (props) {
  let userManagementBackendApi = new UserManagementBackendApi();
  let userLocalStorage = new UserLocalStorage()
  let history = useHistory();
  userManagementBackendApi.profile().then(res => {
    if(!res.data.passport || !res.data.passport.user.firstName){
     history.push("/");
    }
  }).catch(()=>{
    history.push("/");
  })
  const firstName = useRef(null);
  const lastName = useRef(null);
  const userName = useRef(null);

  const [CreateUser]= useMutation(CREATE_USER, {refetchQueries: mutationResult => [{query: FETCH_USERS}]})
  const [DeleteUser]= useMutation(DELETE_USER, {refetchQueries: mutationResult => [{query: FETCH_USERS}]})
  const [UpdateUser]= useMutation(UPDATE_USER, {refetchQueries: mutationResult => [{query: FETCH_USERS}]})
  const [DeleteUserAuth] = useMutation(DELETE_USER_AUTH, {refetchQueries: mutationResult => [{query: FETCH_USER_AUTH}]})

  function handleClear(){
    firstName.current.value = '';
    lastName.current.value = '';
    userName.current.value = '';
  }
  function handleClick(){
    CreateUser({variables: {firstName: firstName.current.value, lastName: lastName.current.value,
        userName: userName.current.value
    }});
    handleClear();
  }
  let tableEntry = [];
  if(props.users && props.users.users){
    tableEntry =  props.users.users.map(value => {
        if(props.userAuth){
          return {...value, hasPassword: !!props.userAuth.userAuths.find(auth => auth.userId === value.id)}
        }
        return {...value, hasPassword: false}
      })
      .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
      .map(value=> <User key={value.id}
                         handleEditButton={UpdateUser}
                         handleDeleteButton={DeleteUser}
                         handleResetButton={DeleteUserAuth}
                         value={value}/>)
  }
  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">User Name</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="text" ref={userName} placeholder="User Name"/></td>
          <td><input type="text" ref={firstName} placeholder="First Name"/></td>
          <td><input type="text" ref={lastName} placeholder="Last Name"/></td>
          <td><button onClick={handleClick}>add</button></td>
          <td><button onClick={handleClear}>clear</button></td>
        </tr>
        <tr></tr>
        <tr></tr>
        {tableEntry}
      </tbody>
    </table>
  )
}