import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";
import { getIdToken } from "../auth/cognito";

function handleUnauthorized() {
  // Clear Cognito session artifacts
  sessionStorage.removeItem("cognito_id_token");
  sessionStorage.removeItem("cognito_pkce_verifier");
  sessionStorage.removeItem("cognito_oauth_state");

  // Route back to login
  window.location.replace("/");
}

// Wraps the fetch call and it calls the graphql server
async function fetchGraphQL(params: RequestParameters, variables: Variables) {
  const cfg = (window as any).__APP_CONFIG__ || {};
  const URL = cfg.GRAPHQL_ENDPOINT || "/graphql";
  const token = getIdToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include", // keep for legacy session coexistence
      headers,
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new Error("GraphQL request failed: 401 Unauthorized");
    }

    if (!response.ok) {
      throw new Error(
        `GraphQL request failed: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    throw error;
  }
}

export default new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
});
