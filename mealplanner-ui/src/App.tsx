import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { Suspense, useEffect, useState } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./layouts/Layout";
import { LoggedIn } from "./LoggedIn";
import { Login } from "./pages/Login";
import { MealPlan } from "./pages/MealPlans/MealPlan";
import { MealPlans } from "./pages/MealPlans/MealPlans";
import environment from "./relay/environment";
import { fetchCurrentPerson, initState } from "./state/state";

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
    },
  },
});

//Initializing local state from state.ts
initState();

//fetchCurrentPerson();

function App() {
  let [intialized, setInitialized] = useState(false);
  useEffect(() => {
  fetchCurrentPerson().then(() => {
    setInitialized(true);
  })
  }, []);
  if(!intialized) {
    return <h1>loading...</h1>;
  }
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/mealplans/:id"
              element={
                <Suspense fallback={"loading inner..."}>
                  <LoggedIn>
                  <MealPlan />
                  </LoggedIn>
                  
                </Suspense>
              }
            />
            <Route
              path="/mealplans"
              element={
                <Suspense fallback={"loading Mealplans list..."}>
                  <LoggedIn>
                  <MealPlans />
                  </LoggedIn> 
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={"loading Login..."}>
                  <Login />
                </Suspense>
                // <h4>
                //   This page is not yet implemented. Go to mealplans/:id Eg;
                //   localhost/mealplans/3
                // </h4>
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