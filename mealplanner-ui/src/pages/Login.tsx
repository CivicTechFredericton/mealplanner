import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React, { useState,useEffect } from "react";
import { useLazyLoadQuery,useQueryLoader, usePreloadedQuery, PreloadedQuery, useRelayEnvironment } from "react-relay";
import { Navigate } from "react-router";
import { getCurrentPerson, login, socialLogin, updatePersonTerms, useVerifyFacebook, useVerifyGoogle } from "../state/state";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { LoginQuery } from "./__generated__/LoginQuery.graphql";
import { LoginVerifyEmailQuery} from "./__generated__/LoginVerifyEmailQuery.graphql";
import {ReactFacebookLoginInfo, ReactFacebookFailureResponse } from "react-facebook-login";
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

const EmailVerificationQuery = graphql`
  query LoginVerifyEmailQuery($username: String!) {
    emailExists(userEmail: $username)
  }
`;
//const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
//const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID || "";
const GOOGLE_CLIENT_ID = "";
const FACEBOOK_APP_ID = "";
console.log(GOOGLE_CLIENT_ID);
console.log(FACEBOOK_APP_ID);
export const Login = () => {
  let [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [emailError, setEmailError] = useState("");  
  const [checkPerformed, setCheckPerformed] = useState(false);
  const [queryReference, loadQuery] = useQueryLoader<LoginVerifyEmailQuery>(EmailVerificationQuery,null);
  const verifyGoogle = useVerifyGoogle();
  const verifyFacebook = useVerifyFacebook();
  const [authError, setAuthError] = useState("");

  const handleVerifyEmail = () => {
    setCheckPerformed(true);
    // Trigger email verification on button click
    if (username) {
      loadQuery({ username });
    }
  };

  const handleLogin = async () => {
    try {
      await socialLogin(username);
    } catch (err: any) {
      console.log("login error", err);
      setResult(err);
    }
  };

  
  const verifyEmailData = usePreloadedQuery<LoginVerifyEmailQuery>(
    EmailVerificationQuery,
    queryReference ?? { variables: { username: "" }} as PreloadedQuery<LoginVerifyEmailQuery> // Ensure a valid default
  );


  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setAuthError(""); 
    const idToken = credentialResponse.credential;
    if (idToken){  
      console.log("Google ID Token:", idToken);
      try {
        const isVerified = await verifyGoogle(idToken, username);
        if (isVerified) {
          console.log("User successfully verified");
          handleLogin();
        } else {
          console.log("Token verification failed");
          setAuthError("Please use "+username+" to login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setAuthError("Please use "+username+" to login");
      }
    }else{
      setAuthError("Please use "+username+" to login");
      return;
    }
  };

  const handleFacebookSuccess = async (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    setAuthError(""); 
    if("accessToken" in response){
        console.log("Facebook Access Token:", response.accessToken);
      try {
        const isVerified = await verifyFacebook(response.accessToken as string, username);
        if (isVerified) {
          console.log("Facebook token verified successfully");
          handleLogin();
        } else {
          console.error("Facebook token verification failed");
          setAuthError("Please use "+username+" to login");

        }
      } catch (error) {
        console.error("Error verifying Facebook token:", error);
        setAuthError("Please use "+username+" to login");
      }
    } else {
      console.error("Facebook login failed");
      setAuthError("Please use "+username+" to login");
    }
  };
  

  useEffect(() => { 
      if (verifyEmailData?.emailExists) {
      setEmailExists(true);
      setEmailError("");
    } else if (username && checkPerformed)  {
      setEmailExists(false);
      setEmailError("Email not found. Please check and try again.");
    }
  }, [verifyEmailData, username]);
  console.log(verifyEmailData)


  let data = useLazyLoadQuery<LoginQuery>(
    query,
    {},
    {
      fetchPolicy: "network-only",
      fetchKey: getCurrentPerson().personID,
      networkCacheConfig: {
        force: true,
      },
    }
  );
  console.log(data.gqLocalState.currentUser?.personID);
  if (data.gqLocalState.currentUser?.personID) {
    return <Navigate to="/mealplans" replace/>;
  }
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

      <main
        style={{
          height: "580px",
          backgroundImage: `url('/images/veggie-background-log-in.png')`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <section
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              handleLogin();
              ev.preventDefault();
            }
          }}
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
          <Typography variant="h5">Looking for a healthier meal?</Typography>

          <TextField
            variant="filled"
            placeholder="user name"
            disabled={emailExists} 
            onChange={(e) => setUsername(e.target.value)}
            error={!!emailError}
            helperText={emailError}  
          ></TextField>
          
          <Button
            variant="contained"
            disabled={emailExists} 
            color="primary"
            onClick={handleVerifyEmail}
          >
            Verify Email
          </Button>
          
          {emailExists && (
            <>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log("Google login failed")} />

              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                fields="email"
                callback={handleFacebookSuccess}  // This callback is invoked after login
                render={(renderProps) => (
                  <Button variant="contained" color="primary" onClick={renderProps.onClick}>
                    Login with Facebook
                  </Button>
                )}
              />
            </>
          )}
          {authError && (
              <Typography variant="body2" color="error">
                {authError}
              </Typography>
            )}      
          {result ? (
            <Typography variant="body2" color={"red"}>
              {result}
            </Typography>
          ) : (
            <></>
          )}
          
          <Typography fontSize="small" marginTop={"3rem"}>
            Don't have an account? <br />
            Contact{" "}
            <label style={{ color: "green" }}>
              john.doe@greenervillage.com
            </label>{" "}
            to get started
          </Typography>
        </section>
      </main>
    </GoogleOAuthProvider>
  );
};