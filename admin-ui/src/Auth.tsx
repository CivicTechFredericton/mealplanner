//This is to implement login and logout

import { ApolloClient, gql, useApolloClient } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { _renderMatches } from "react-router/lib/hooks";

//We need to get CurrentPerson to check whether it is logged in
//construct the graphql query for CurrentPerson

const currentPersonQuery = gql`
  query currentPerson {
    currentPerson {
      rowId
      fullName
      email
    }
  }
`;

//providing the variables in the graphql query
interface CurrentPerson {
  rowId: string;
  fullName: string;
  email: string;
}

//Define the interface with currentPerson, login and logout functions
interface AuthInfo {
  currentPerson: CurrentPerson | null;
  login: (email: string, password: string) => Promise<CurrentPerson | null>;
  logout: () => Promise<void>;
}

//For creating a react component AuthProvider
//First Define the type context (type interface) to be used for return value
const AuthContext = React.createContext<AuthInfo>({
  currentPerson: null,
  login: (_e, _p) => {
    throw "unimplemented";
  },
  logout: () => {
    throw "unimplemented";
  },
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

  return (
    <AuthContext.Provider
      value={{
        currentPerson: currentPerson,
        login: async (email, password) => {
          let cu = await loginFn(client, email, password);
          setCurrentPerson(cu);
          return cu;
        },
        logout: () => {
          throw "unimplemented";
        },
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
    fetchPolicy: "network-only"
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
    authenticate(input: {userEmail: $userEmail, password: $password}) {
        jwtToken {
            role
            personId
        }
    }
}`

const loginFn = async (client: ApolloClient<object>, userEmail: string, password: string):Promise<CurrentPerson | null> => {
    let result = await client.mutate({
        mutation: loginMutation,
        variables: {userEmail, password}
    });
    if (result.data["authenticate"] !== null) {
        return getCurrentPerson(client);
    }
    return null;
}
