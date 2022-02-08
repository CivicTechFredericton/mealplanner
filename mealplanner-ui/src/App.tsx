import React, { Suspense } from "react";
import "./App.css";
import { CurrentUser } from "./components/CurrentUser";
import { RelayEnvironmentProvider } from "react-relay";
import environment from "./relay/environment";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mealplanner Version 2 </h1>
      </header>
      <RelayEnvironmentProvider environment={environment}>
        <Suspense fallback={"Finding user.."}>
          <CurrentUser />
        </Suspense>
      </RelayEnvironmentProvider>
    </div>
  );
}

export default App;
