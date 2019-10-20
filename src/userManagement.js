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

export default function UserManagement () {
  let userLocalStorage = new UserLocalStorage()
  let history = useHistory();
  if(!userLocalStorage.getUserId()){
    history.push("/");
  }
  const firstName = useRef(null);
  const lastName = useRef(null);
  const userName = useRef(null);
  const { data } = useQuery(FETCH_USERS);
  const [CreateUser]= useMutation(CREATE_USER, {refetchQueries: mutationResult => [{query: FETCH_USERS}]})
  const [DeleteUser]= useMutation(DELETE_USER, {refetchQueries: mutationResult => [{query: FETCH_USERS}]})
  const [UpdateUser]= useMutation(UPDATE_USER, {refetchQueries: mutationResult => [{query: FETCH_USERS}]})
  function handleClear(){
    firstName.current.value = '';
    lastName.current.value = '';
    userName.current.value = '';
  }
  function handleClick(){
    CreateUser({variables: {firstName: firstName.current.value, lastName: lastName.current.value,
        userName: userName.current.value
    }})
  }
  let tableEntry = [];
  if(data && data.users){
    tableEntry =  data.users
      .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
      .map(value=> <User key={value.id}
                         handleEditButton={UpdateUser}
                         handleDeleteButton={DeleteUser}
                         value={value}/>)
  }
  return (
    <table>
      <thead>
      <tr>
        <th>User Name</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th></th>
        <th></th>
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