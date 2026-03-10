import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { graphql } from "relay-runtime";
import { Suspense, useEffect, useState } from "react";
import { useQueryLoader, usePreloadedQuery } from "react-relay";
import { Navigate } from "react-router-dom";
import { getCurrentPerson, login, updatePersonTerms } from "../state/state";
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

//The LoginInner component is the main login page component that displays the login form 
//and handles the login process.
const LoginInner = ({ queryRef }: { queryRef: any }) => {
  const data = usePreloadedQuery<LoginQuery>(query, queryRef);

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

  if (data.gqLocalState.currentUser?.personID) {
    return <Navigate to="/mealplans" replace />;
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

export const Login = () => {
  const [queryRef, loadQuery] = useQueryLoader<LoginQuery>(query);

  useEffect(() => {
    loadQuery({}, { fetchPolicy: "network-only" });
  }, [loadQuery]);

  if (!queryRef) {
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
          <Typography variant="h5">Loading...</Typography>
        </section>
      </main>
    );
  }

  return (
    <Suspense
      fallback={
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
            <Typography variant="h5">Loading...</Typography>
          </section>
        </main>
      }
    >
      <LoginInner queryRef={queryRef} />
    </Suspense>
  );
};
