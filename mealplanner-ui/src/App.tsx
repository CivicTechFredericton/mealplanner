import React, { Suspense } from "react";
import "./App.css";
import { RelayEnvironmentProvider } from "react-relay";
import environment from "./relay/environment";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/Auth";
import { Layout } from "./layouts/Layout";
import { MealPlan } from "./pages/MealPlans/MealPlan";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { initState } from "./state/state";
import { LoginPage } from "./pages/Login";

const theme = createTheme({
  palette: {
    primary: {
       light: "#8CD068",
      //light: "#E8F3DB",
      main: "#6AA64A",
      dark: "#436D2C",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    grey: {
      800: "#404040",
    },
    info: {
      main: "#ffffff",
    }
  },
});

//Initializing local state from state.ts
initState();

function App() {
  const auth = useAuth();

  //const {userEmail, signin, signout} = useAuth();
  const userName = process.env.USERNAME || "";
  const password = process.env.PASSWORD || "";

  const login =
    auth != null ? (
      auth.userEmail != null ? (
        <p>
          Logged in as {auth.userEmail}.{" "}
          <button onClick={auth.signout}>Logout</button>
        </p>
      ) : (
        <button
          onClick={() => {
            auth.signin(userName, password);
          }}
        >
          Login
        </button>
      )
    ) : (
      ""
    );

  return (
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/mealplans/:id"
              element={
                <Suspense fallback={"loading inner..."}>
                  {" "}
                  <MealPlan />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={"loading..."}>
                  <LoginPage/>
                </Suspense>
              }
            >
              {" "}
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
