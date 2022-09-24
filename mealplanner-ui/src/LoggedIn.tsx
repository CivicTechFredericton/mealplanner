// Ensure the user is logged in before routing to meal plans and such authorised pages.
import * as React from "react";
import { Navigate } from "react-router";
import { getCurrentPerson } from "./state/state";

export const LoggedIn = ({ children }: { children: React.ReactNode }) => {
  console.log(`current Person ID in LoggedIn ${getCurrentPerson()}`);
  if (getCurrentPerson().personID === "") return <Navigate to="/" />;
  return <React.Fragment>{children}</React.Fragment>;
};
