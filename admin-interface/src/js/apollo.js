import {
  ApolloClient,
  InMemoryCache
} from 'apollo-boost';
import {createUploadLink} from 'apollo-upload-client';
import { ApolloLink } from "apollo-link";
import { getCurrentToken } from './auth';

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = getCurrentToken()
  const headers = {}

  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  operation.setContext({ headers });
  return forward(operation);
});

const client = new ApolloClient({
  link: middlewareLink.concat(
    createUploadLink({
    uri: process.env.GRAPHQL_URL || 'http://localhost:4000/graphql'
    // uri: 'http://fast-everglades-80450.herokuapp.com/graphql'
    })
  ),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
});

export default client;
