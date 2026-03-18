// Ensure the user is logged in before routing to meal plans and such authorised pages.
import * as React from "react";
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from 'react';
import { fetchUserAttributes } from "aws-amplify/auth";

export const LoggedIn = ({ children }: { children: React.ReactNode }) => {
  const [sessionState, setSessionState] = useState<"loading" | "authenticated" | "unauthenticated" | "needs-terms">("loading");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await fetchUserAttributes();
        if (user) {
          if (user["custom:terms_and_conditions"] === "0") {
            setSessionState("needs-terms");
          } else {
            setSessionState("authenticated");
          }
        } else {
          setSessionState("unauthenticated");
        }
      } catch (error) {
        setSessionState("unauthenticated");
      }
    };
    checkSession();
  }, []);

  if (sessionState === "loading") {
    return null;
  }

  if (sessionState === "unauthenticated") {
    return <Navigate to="/" />;
  }

  if (sessionState === "needs-terms") {
    return <Navigate to="/terms" replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
