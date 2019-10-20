import React from "react";
import  { useRef, useState  } from 'react';

export default function User (props) {
  const [isEditing, setIsEditing] = useState(false);
  const firstName = useRef(  null);
  const lastName = useRef(null);
  const userName = useRef(null);
  function handleEdit () {
    setIsEditing(true)
  }
  function handleSave() {
    props.handleEditButton({variables: {
        id: props.value.id,
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        userName: userName.current.value
      }});
    setIsEditing(false)
  }
  let toggle;
  if(!isEditing){
    toggle = (<React.Fragment>
      <td>{props.value.userName}</td>
      <td>{props.value.firstName}</td>
      <td>{props.value.lastName}</td>
      <td><button onClick={handleEdit}>edit</button></td>
    </React.Fragment>)
  } else {
    toggle = (
      <React.Fragment>
        <td><input type="text" ref={userName}   defaultValue={props.value.userName} placeholder="User Name"/></td>
        <td><input type="text"  ref={firstName} defaultValue={props.value.firstName}  placeholder="First Name"/></td>
        <td><input type="text" ref={lastName} defaultValue={props.value.lastName} placeholder="Last Name"/></td>
        <td><button onClick={handleSave}>save</button></td>
      </React.Fragment>
    )
  }
  let resetButton = {};
  if(props.value.hasPassword){
    resetButton = (<td><button>Reset Password</button></td>)
  } else {
    resetButton = (<td>Password Does Not Exist</td>)
  }
  return (
    <tr>
      {toggle}
      <td><button onClick={()=>props.handleDeleteButton({variables: {id: props.value.id}})}>remove</button></td>
      {resetButton}
    </tr>
  )
}