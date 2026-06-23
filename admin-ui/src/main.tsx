import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Auth";
import {
  getIdToken,
  handleCognitoCallbackIfPresent,
  isExpiringSoon,
  refreshIdToken,
} from "./auth/cognito";
import "./index.css";

const authLink = setContext(async (_, { headers }) => {
  let token = getIdToken();
  if (token && isExpiringSoon(token)) {
    token = (await refreshIdToken()) ?? token;
  }
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

const httpLink = new HttpLink({ uri: "/api/graphql" });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

async function init() {
  try {
    await handleCognitoCallbackIfPresent();
  } catch (e) {
    console.error("Cognito callback failed:", e);
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
}

init();
