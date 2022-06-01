import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import gql from 'graphql-tag'
import client from './apollo'

const COOKIE_NAME = 'mealplannerAccessToken';

const authMutation = gql`
mutation LoginMutation(
  $userEmail: String,
  $password: String
) {
  authenticate(input: {
    userEmail: $userEmail
    password: $password
  }) {
    jwtToken
  }
}
`;

export const authenticate = async ({ userEmail, password }) => {
  const result = await client.mutate({
    mutation: authMutation,
    variables: { userEmail, password },
  });
  const token = result?.data?.authenticate?.jwtToken ?? null
  console.log(token)
  if (token != null) {
    setCurrentToken(token)
    return token
  } else {
    throw new Error(JSON.stringify(result))
  }
};

export function isAuthenticated() {
  return getCurrentToken() !== undefined
}

export function logout(e, redirect = true) {
  e.preventDefault();
  clearCurrentToken();
  if (redirect) {
    window.location = '/login';
  }
}

export function getCurrentToken() {
  // TODO probably a faster way to access this than parsing 
  // the document cookie each time
  return cookie.parse(document.cookie)[COOKIE_NAME];
}

export function setCurrentToken(token) {
  const invalidMessage = `IllegalArgumentError: cannot set token with value ${token}`;

  // throw invalid if no token passed or its not a string
  if (!token || typeof token !== 'string') {
    throw new Error(invalidMessage);
  }

  // throw error if can't be parsed as JWT
  const decodedCookie = jwt.decode(token);
  if (!decodedCookie) {
    throw new Error(invalidMessage);
  }

  // if the JWT token has an exp claim, use that as cookie exp
  let cookieExp = '';
  if (decodedCookie.exp) {
    cookieExp = ` ${new Date(decodedCookie.exp * 1000).toUTCString()};`;
  }
  document.cookie = `${COOKIE_NAME}=${token};${cookieExp}; path=/`;
}


export function clearCurrentToken() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}