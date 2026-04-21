import { ResourcesConfig } from "aws-amplify";

const awsconfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.COGNITO_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: import.meta.env.COGNITO_OAUTH_DOMAIN,
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: [import.meta.env.COGNITO_REDIRECT_SIGN_IN],
          redirectSignOut: [import.meta.env.COGNITO_REDIRECT_SIGN_OUT],
          responseType: 'code'
        }
      }
    }
  }
};

export default awsconfig;
