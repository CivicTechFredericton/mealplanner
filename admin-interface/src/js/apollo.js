import {
  ApolloClient,
  InMemoryCache
} from 'apollo-boost';
import {createUploadLink} from 'apollo-upload-client';
const client = new ApolloClient({
  link: createUploadLink({
    uri: process.env.GRAPHQL_URL || 'http://localhost:4000/graphql'
  }),
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