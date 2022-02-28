import React, { Suspense } from "react";
import "./App.css";
import { CurrentUser } from "./components/CurrentUser";
import { RelayEnvironmentProvider } from "react-relay";
import environment from "./relay/environment";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/Auth";

function App() {
  const auth = useAuth();

    
  //const {userEmail, signin, signout} = useAuth();
  const userName = process.env.USERNAME || '';
  const password = process.env.PASSWORD || '';

  const login = auth !=null ? (
    auth.userEmail != null ? (<p>
      Logged in as {auth.userEmail}. <button onClick={auth.signout}>Logout</button> 
      </p>) : <button onClick={() => {auth.signin(userName, password)}}>Login</button>
  ) : ""

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mealplanner Version 2 </h1>
        {login}
      </header>
      <RelayEnvironmentProvider environment={environment}>
          <Routes>
            <Route path="/" element={<Suspense fallback={"loading inner..."}> <CurrentUser /></Suspense>} />
          </Routes>
      </RelayEnvironmentProvider>
    </div>
  );
}

export default App;
