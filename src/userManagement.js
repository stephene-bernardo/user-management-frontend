import React from 'react';
import { ApolloClient } from 'apollo-client';
import gql from "graphql-tag";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default class UserManagement extends React.Component {
  constructor(props){
    super(props);
    const link = new HttpLink({
      uri: 'http://localhost:4201/graphql'
    });

    const cache = new InMemoryCache();
    console.log('elo')
    const client = new ApolloClient({
      cache,
      link,
      fetchOptions: {
        mode: 'no-cors',
      },
    });
    client.query({
        query: gql`{users {id, firstName, lastName, userName}}`
      })
      .then(result => console.log(result));

  }

  render(){
    return <div>User Management1</div>
  }

}