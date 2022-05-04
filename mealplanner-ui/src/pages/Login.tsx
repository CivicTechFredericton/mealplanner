import { graphql } from "babel-plugin-relay/macro";
import * as React from "react";
import { useLazyLoadQuery } from "react-relay";
import { currentPersonID, login, logout } from "../state/state";
import { LoginQuery } from "./__generated__/LoginQuery.graphql";

const query = graphql`
  query LoginQuery {
    currentPerson {
      fullName
      email
    }
    gqLocalState {
      currentUser {
        personID
      }
    }
  }
`;

export const LoginPage = () => {
  let data = useLazyLoadQuery<LoginQuery>(
    query,
    {},
    {
      fetchPolicy: "network-only",
      fetchKey: currentPersonID(),
      networkCacheConfig: {
        force: true,
      },
    }
  );

  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");

  return (
    <div>
      <p>Currently logged in as {data.currentPerson?.fullName}</p>
      <p>person id is {data.gqLocalState.currentUser?.personID}</p>
      <input
        type="text"
        name="login"
        placeholder="enter email..."
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          login(username, password);
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};
