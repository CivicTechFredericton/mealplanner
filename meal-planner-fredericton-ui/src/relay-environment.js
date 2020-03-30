import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import { getCurrentToken } from './utils/auth';

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

  let resp = await fetch('http://localhost:4000/graphql', {
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