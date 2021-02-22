import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import { getCurrentToken } from './utils/auth';

function getGraphQLURL() {
  if (process.env.REACT_APP_GRAPHQL_URL) {
    return process.env.REACT_APP_GRAPHQL_URL;
  }
  return 'http://localhost:4000/graphql';
}

async function fetchQuery(
  operation,
  variables,
) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const authtoken = getCurrentToken();
  if (authtoken) {
    headers.Authorization = `Bearer ${authtoken}`;
  }

  let resp = await fetch(getGraphQLURL(), {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });
  return resp.json();
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),  
});

export default environment;