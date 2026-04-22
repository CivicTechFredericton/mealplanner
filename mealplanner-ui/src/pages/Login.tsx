import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { graphql } from "relay-runtime";
import { Component, Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";
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

// ─── Shared login form shell ──────────────────────────────────────────────────
const LoginShell = ({ children }: { children: ReactNode }) => (
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
      {children}
    </section>
  </main>
);

// ─── Error Boundary — shows a friendly message if GraphQL is unreachable ──────
class LoginErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <LoginShell>
          <Typography variant="h5">Looking for a healthier meal?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            The server is temporarily unavailable. Please try again in a moment.
          </Typography>
        </LoginShell>
      );
    }
    return this.props.children;
  }
}

// ─── Inner component — reads Relay query, handles login form ─────────────────
const LoginInner = ({ queryRef }: { queryRef: any }) => {
  const data = usePreloadedQuery<LoginQuery>(query, queryRef);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <LoginShell>
      <Typography variant="h5">Looking for a healthier meal?</Typography>

      <TextField
        variant="filled"
        placeholder="user name"
        onChange={(e) => setUsername(e.target.value)}
      />

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
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {result && (
        <Typography variant="body2" color="error">
          {result}
        </Typography>
      )}

      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>

      <Typography fontSize="small" marginTop="3rem">
        Don't have an account? <br />
        Contact{" "}
        <label style={{ color: "green" }}>john.doe@greenervillage.com</label>{" "}
        to get started
      </Typography>
    </LoginShell>
  );
};

// ─── Exported component ───────────────────────────────────────────────────────
export const Login = () => {
  const [queryRef, loadQuery] = useQueryLoader<LoginQuery>(query);

  useEffect(() => {
    loadQuery({}, { fetchPolicy: "network-only" });
  }, [loadQuery]);

  if (!queryRef) {
    return (
      <LoginShell>
        <Typography variant="h5">Loading...</Typography>
      </LoginShell>
    );
  }

  return (
    <LoginErrorBoundary>
      <Suspense
        fallback={
          <LoginShell>
            <Typography variant="h5">Loading...</Typography>
          </LoginShell>
        }
      >
        <LoginInner queryRef={queryRef} />
      </Suspense>
    </LoginErrorBoundary>
  );
};
