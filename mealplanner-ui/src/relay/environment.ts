import {Environment, Network, RecordSource, RequestParameters, Store, Variables} from 'relay-runtime';

//Wraps the fetch call and it calls the graphql server
async function fetchGraphQL(params : RequestParameters, variables: Variables) {
    const URL = import.meta.env.VITE_GRAPHQL_ENDPOINT || '/graphql';
    try {
        const response = await fetch(URL, {
            method: 'POST',
            credentials:  'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: params.text,
                variables,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('GraphQL fetch error:', error);
        throw error;
    }
}

export default new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
})
