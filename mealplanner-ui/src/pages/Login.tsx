import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { Navigate } from "react-router";
import { getCurrentPerson, login } from "../state/state";
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
  const [result, setResult] = useState("");

  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (err: any) {
      console.log("login error", err);
      setResult(err);
    }
  };

  let data = useLazyLoadQuery<LoginQuery>(
    query,
    {},
    {
      fetchPolicy: "network-only",
      fetchKey: getCurrentPerson().personID,
      networkCacheConfig: {
        force: true,
      },
    }
  );
  if (data.gqLocalState.currentUser?.personID) {
    return <Navigate to="mealplans" replace />;
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
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            handleLogin();
            ev.preventDefault();
          }
        }}
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
        {result ? (
          <Typography variant="body2" color={"red"}>
            {result}
          </Typography>
        ) : (
          <></>
        )}
        <Button variant="contained" onClick={handleLogin}>
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
