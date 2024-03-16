import {Environment, Network, RecordSource, RequestParameters, Store, Variables} from 'relay-runtime';

//Wraps the fetch call and it calls the graphql server
async function fetchGraphQL(params : RequestParameters, variables: Variables) {
    const TOKEN = process.env.REACT_APP_GRAPHQL_TOKEN;
    const URL = process.env.GRAPHQL_ENDPOINT || '/graphql';
    const response = await fetch(URL, {
        method: 'POST',
        credentials:  'include',
        headers: {
            Authorization: `bearer ${TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: params.text,
            variables,
        }),
    }
    );
    return await response.json();
}

//create a relay environment that requires network and store
export default new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
})