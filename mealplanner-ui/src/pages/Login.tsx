import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { wait } from "@testing-library/user-event/dist/utils";
import { graphql } from "babel-plugin-relay/macro";
import React, { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { Navigate } from "react-router";
import { currentPersonID, login } from "../state/state";
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

export const Login = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };
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
  if (data.gqLocalState.currentUser?.personID) {
    return <Navigate to="/mealplans/3" replace />;
  }
  return (
    <main
      style={{
        height: "560px",
        backgroundImage: `url('/images/veggie-background-log-in.png')`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <section
        style={{
          width: "30%",
          height: "400px",
          backgroundColor: "white",
          padding: "2rem",
          margin: "2rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography variant="h5">Looking for a healthier meal?</Typography>

        <TextField
          variant="filled"
          placeholder="user name"
          onChange={(e) => setUsername(e.target.value)}
        ></TextField>

        <TextField
          type={showPassword ? "text" : "password"}
          placeholder="password"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleVisibility}
                >
                  {showPassword ? (
                    <VisibilityOff></VisibilityOff>
                  ) : (
                    <Visibility></Visibility>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Button
          variant="contained"
          onClick={(e) => {
            login(username, password);
          }}
        >
          Login
        </Button>
        <Typography fontSize="small" marginTop={"3rem"}>
          Don't have an account? <br />
          Contact{" "}
          <label style={{ color: "green" }}>
            john.doe@greenervillage.com
          </label>{" "}
          to get started
        </Typography>
      </section>
    </main>
  );
};
