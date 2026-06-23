import { ApolloClient, gql, useApolloClient } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { Button, TextField, Typography, Box, Divider } from "@mui/material";
import { startCognitoLogin, cognitoLogout, getIdToken } from "./auth/cognito";

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

interface CurrentPerson {
  rowId: string;
  fullName: string;
  email: string;
  role: string;
}

interface AuthInfo {
  currentPerson: CurrentPerson | null;
  raAuthProvider: RAAuthProvider | null;
}

const AuthContext = React.createContext<AuthInfo>({
  currentPerson: null,
  raAuthProvider: null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const client = useApolloClient();
  const [currentPerson, setCurrentPerson] = useState<CurrentPerson | null>(null);

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
    <AuthContext.Provider value={{ currentPerson, raAuthProvider: authObject }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthInfo => {
  return useContext(AuthContext);
};

const getCurrentPerson = async (
  client: ApolloClient<object>
): Promise<CurrentPerson | null> => {
  const result = await client.query({
    query: currentPersonQuery,
    fetchPolicy: "network-only",
  });
  if (result.data["currentPerson"]) {
    return result.data["currentPerson"];
  }
  return null;
};

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
  const result = await client.mutate({
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
  const result = await client.mutate({ mutation: logoutMutation });
  if (result.data["logout"] !== null) {
    return result.data["logout"];
  }
};

class RAAuthProvider {
  _client: ApolloClient<object>;
  constructor(client: ApolloClient<object>) {
    this._client = client;
  }

  login(params: any) {
    const { username, password } = params || {};
    if (username && password) {
      return loginFn(this._client, username, password);
    }
    startCognitoLogin();
    return new Promise(() => {});
  }

  async logout() {
    if (getIdToken()) {
      cognitoLogout();
      return Promise.resolve();
    }
    await logoutFn(this._client);
    return Promise.resolve();
  }

  async getIdentity() {
    const cp = await getCurrentPerson(this._client);
    if (cp !== null) {
      return { id: cp.rowId, fullName: cp.fullName, role: cp.role };
    }
    throw "invalid user";
  }

  async checkAuth() {
    try {
      const token = getIdToken();
      const identity = await this.getIdentity();

      if (!identity) return Promise.reject();

      if (identity.role === "app_admin" || identity.role === "app_meal_designer") {
        return Promise.resolve();
      }

      if (token) {
        sessionStorage.removeItem("cognito_id_token");
        sessionStorage.removeItem("cognito_refresh_token");
        return Promise.reject({
          message:
            "Unauthorized: insufficient privileges. Please contact an admin to grant you access.",
        });
      }
      return Promise.reject("User does not have permissions");
    } catch (_) {
      return Promise.reject();
    }
  }

  checkError(e: any) {
    const status = e?.status || e?.networkError?.statusCode;
    if (status === 401 || status === 403) {
      sessionStorage.removeItem("cognito_id_token");
      sessionStorage.removeItem("cognito_refresh_token");
      return Promise.reject();
    }
    return Promise.resolve();
  }

  getPermissions() {
    return Promise.resolve();
  }
}

export const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();

  const handleLegacyLogin = async () => {
    try {
      await login({ username, password });
    } catch (e) {
      notify("Invalid credentials", { type: "error" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 2,
      }}
    >
      <Typography variant="h5">MealPlanner Admin</Typography>
      <Button
        variant="contained"
        sx={{ width: 300 }}
        onClick={() => startCognitoLogin()}
      >
        Login with Cognito
      </Button>
      <Divider sx={{ width: 300 }}>or</Divider>
      <TextField
        label="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ width: 300 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ width: 300 }}
        onKeyDown={(e) => e.key === "Enter" && handleLegacyLogin()}
      />
      <Button variant="outlined" onClick={handleLegacyLogin} sx={{ width: 300 }}>
        Legacy Login
      </Button>
    </Box>
  );
};
