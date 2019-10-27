import gql from 'graphql-tag';

export const FETCH_USER_AUTH = gql `{userAuths {userId}}`;
export const FETCH_USERS = gql`{users {id, firstName, lastName, userName}}`;
export const CREATE_USER = gql`mutation CreateUser($firstName: String!, $lastName: String!, $userName: String!)
     {createUser(user: {firstName:$firstName, lastName:$lastName, userName: $userName}){id}}`;
export const DELETE_USER = gql `mutation DeleteUser($id:Int!){deleteUser(id: $id)}`;
export const UPDATE_USER = gql `mutation UpdateUser($id: Int!, $firstName: String!, $lastName: String!, $userName: String!)
{updateUser(id: $id, userInput: {firstName: $firstName, lastName: $lastName, userName: $userName})}`
export const DELETE_USER_AUTH = gql `mutation DeleteUserAuth($userId: Int!){deleteUserAuth(userId: $userId)}`;
