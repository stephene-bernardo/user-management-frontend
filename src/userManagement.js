import React from 'react';
import {useQuery, useMutation} from "@apollo/react-hooks";
import gql from 'graphql-tag';
import  { useRef } from 'react'
import User from "./user";
import { useHistory } from "react-router-dom";
import UserLocalStorage from "./services/userLocalStorage";

const FETCH_USERS = gql`{users {id, firstName, lastName, userName}}`;
const CREATE_USER = gql`mutation CreateUser($firstName: String!, $lastName: String!, $userName: String!)
     {createUser(user: {firstName:$firstName, lastName:$lastName, userName: $userName}){id}}`;
const DELETE_USER = gql `mutation DeleteUser($id:Int!){deleteUser(id: $id)}`;
const UPDATE_USER = gql `mutation UpdateUser($id: Int!, $firstName: String!, $lastName: String!, $userName: String!)
{updateUser(id: $id, userInput: {firstName: $firstName, lastName: $lastName, userName: $userName})}`
const FETCH_USER_AUTH = gql `{userAuths {userId}}`;
const DELETE_USER_AUTH = gql `mutation DeleteUserAuth($userId: Int!){deleteUserAuth(userId: $userId)}`;

export default function UserManagement () {
  let userLocalStorage = new UserLocalStorage()
  let history = useHistory();
  if(!userLocalStorage.getUserId()){
    history.push("/");
  }
  const firstName = useRef(null);
  const lastName = useRef(null);
  const userName = useRef(null);

  const {data: userAuth} = useQuery(FETCH_USER_AUTH, {pollInterval: 1});
  const {data} = useQuery(FETCH_USERS, {pollInterval: 1});
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
  if(data && data.users){
    tableEntry =  data.users.map(value => {
        if(userAuth){
          return {...value, hasPassword: !!userAuth.userAuths.find(auth => auth.userId === value.id)}
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