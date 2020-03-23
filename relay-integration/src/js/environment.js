import {
    Environment,
    Network,
    RecordSource,
    Store,
  } from 'relay-runtime';
  
  async function fetchQuery(
    operation,
    variables,
  ) {
    let resp = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwX3VzZXIiLCJwZXJzb25faWQiOiIyIiwiZXhwIjoxNTg1NDM0OTYxLCJpYXQiOjE1ODQ4MzAxNjEsImF1ZCI6InBvc3RncmFwaGlsZSIsImlzcyI6InBvc3RncmFwaGlsZSJ9.d0Ru-yl-peP7bXQgHK3dCik1RFv_-oY6DbgVO9Y1KLw'
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    })
    return resp.json();
  }
  
  const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),  
  });
  
  export default environment;