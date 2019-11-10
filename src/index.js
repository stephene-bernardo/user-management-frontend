import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BASE_URL} from "./constant";

const link = new HttpLink({
  uri: `${BASE_URL}/graphql`
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link,
  fetchOptions: {
    mode: 'no-cors',
  },
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
