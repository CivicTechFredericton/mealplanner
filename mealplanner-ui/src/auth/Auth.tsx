// Define an auth context for token, signin, signout
import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { fetchQuery } from "relay-runtime";

import environment from "../relay/environment";
import { AuthQuery } from "./__generated__/AuthQuery.graphql";



// Auth Context Provider
type UserType = string | null;
interface AuthContextType {
    userEmail: UserType;
    signin: (username: string, password: string) => Promise<UserType>;
    signout: ()=>void;
} 

let AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider = ({children}:{children : React.ReactNode}) => {
    let [userEmail, setUserEmail] = React.useState<UserType>(null);
    let value:AuthContextType = {
        userEmail: userEmail,
        signin: async (_username, _password) => {
            let data = await fetchQuery<AuthQuery>(environment, graphql`
            query AuthQuery {
                    currentPerson{
                        fullName
                        email
                    }
                }
            `,{}).toPromise();
            let email = data?.currentPerson?.email || null;
            setUserEmail(email);
            return Promise.resolve(email);
        },
        signout: ()=>{setUserEmail(null); console.log('Logged out')}
        }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
    return React.useContext(AuthContext);
}

export {AuthProvider, useAuth};
