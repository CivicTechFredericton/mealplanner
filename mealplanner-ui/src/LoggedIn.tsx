// Ensure the user is logged in before routing to meal plans and such authorised pages.
import * as React from "react";
import { Navigate } from "react-router";
import { currentPersonID } from "./state/state";

export const LoggedIn = ({children}:{children : React.ReactNode}) => {
    console.log(`current Person ID in LoggedIn ${currentPersonID()}`);
    if(currentPersonID() === "") return (
        <Navigate to="/" />
    )
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}