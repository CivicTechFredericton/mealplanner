import React, { Suspense } from "react";
import "./App.css";
import { CurrentUser } from "./components/CurrentUser";
import { RelayEnvironmentProvider } from "react-relay";
import environment from "./relay/environment";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/Auth";

function App() {
  const {userEmail, signin, signout} = useAuth();
  const userName = process.env.USERNAME || '';
  const password = process.env.PASSWORD || '';
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mealplanner Version 2 </h1>
        {userEmail != null ? (<p>
          Logged in as {userEmail}. <button onClick={signout}>Logout</button> 
          </p>) : <button onClick={() => {signin(userName, password)}}>Login</button>}
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
