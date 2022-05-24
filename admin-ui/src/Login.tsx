import { useState } from "react";
import { useAuth } from "./Auth";

export const Login = () => {
  let [userEmail, setUserEmail] = useState("");
  let [password, setPassword] = useState("");
  const auth = useAuth();
  return (
    <>
      <input
        type="text"
        onChange={(e) => setUserEmail(e.target.value)}
        value={userEmail}
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        onClick={(e) => {
          auth.login(userEmail, password);
        }}
      >
        Login
      </button>
    </>
  );
};
