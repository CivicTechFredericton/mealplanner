//This is to implement login and logout

import { ApolloClient, gql, useApolloClient } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";

//We need to get CurrentPerson to check whether it is logged in
//construct the graphql query for CurrentPerson

const currentPersonQuery = gql`
  query currentPerson {
    currentPerson {
      rowId
      fullName
      email
      role
    }
  }
`;

//providing the variables in the graphql query
interface CurrentPerson {
  rowId: string;
  fullName: string;
  email: string;
  role: string;
}

//Define the interface with currentPerson, login and logout functions
interface AuthInfo {
  currentPerson: CurrentPerson | null;
  raAuthProvider: RAAuthProvider | null;
}

//For creating a react component AuthProvider
//First Define the type context (type interface) to be used for return value
const AuthContext = React.createContext<AuthInfo>({
  currentPerson: null,
  raAuthProvider: null,
});
//Next Define the type of the props using interface
interface AuthProviderProps {
  children: React.ReactNode;
}

// Then write the react component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const client = useApolloClient();
  const [currentPerson, setCurrentPerson] = useState<CurrentPerson | null>(
    null
  );
  // useEffect can't call an async function. So we need to create a async function expression
  // and call it immediately inside the useEffect. To call an anonymous async function,
  // enclose it within parenthesis.
  //if we give the function alone it will run in an infinite loop. So we need to define
  // what the function depends on to define the criteria.
  //If we pass in an empty array [], it will run only once.
  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentPerson(client);
      if (currentUser !== null) {
        setCurrentPerson(currentUser);
      }
    })();
  }, []);
  const authObject = new RAAuthProvider(client);

  return (
    <AuthContext.Provider
      value={{
        currentPerson: currentPerson,
        raAuthProvider: authObject,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Export the AuthContext via hook to abstract the context.
export const useAuth = (): AuthInfo => {
  return useContext(AuthContext);
};

//Get Current Person
const getCurrentPerson = async (
  client: ApolloClient<object>
): Promise<CurrentPerson | null> => {
  const result = await client.query({
    query: currentPersonQuery,
    fetchPolicy: "network-only",
  });
  console.log("current person", result.data);
  if (result.data["currentPerson"]) {
    return result.data["currentPerson"];
  }
  return null;
};

//Implementing Login
//First write a mutation

const loginMutation = gql`
  mutation LoginMutation($userEmail: String, $password: String) {
    authenticate(input: { userEmail: $userEmail, password: $password }) {
      jwtToken {
        role
        personId
      }
    }
  }
`;

const loginFn = async (
  client: ApolloClient<object>,
  userEmail: string,
  password: string
): Promise<CurrentPerson | null> => {
  let result = await client.mutate({
    mutation: loginMutation,
    variables: { userEmail, password },
  });
  if (result.data["authenticate"] !== null) {
    return getCurrentPerson(client);
  }
  return null;
};

const logoutMutation = gql`
  mutation LogoutMutation {
    logout {
      status
    }
  }
`;

const logoutFn = async (client: ApolloClient<object>) => {
  let result = await client.mutate({ mutation: logoutMutation });
  if (result.data["logout"] !== null) {
    return result.data["logout"];
  }
};

class RAAuthProvider {
  _client: ApolloClient<object>;
  constructor(client: ApolloClient<object>) {
    this._client = client;
  }
  login({ username, password }: { username: string; password: string }) {
    return loginFn(this._client, username, password);
  }
  async logout() {
    await logoutFn(this._client);
    return Promise.resolve();
  }
  async getIdentity() {
    let cp = await getCurrentPerson(this._client);
    if (cp !== null) {
      return { id: cp.rowId, fullName: cp.fullName, role: cp.role };
    }
    throw "invalid user";
  }
  async checkAuth() {
    let identity = await this.getIdentity();
    if (
      identity &&
      (identity.role === "app_admin" || identity.role === "app_meal_designer")
    )
      return Promise.resolve();
    return Promise.reject("User does not exist or does not have permissions");
  }
  checkError(e: Error) {
    console.log("check Error", e);
    return Promise.resolve();
  }
  getPermissions() {
    //noop - Doesn't do anything. Just implementing to satisfy the interface.

    return Promise.resolve();
  }
}
