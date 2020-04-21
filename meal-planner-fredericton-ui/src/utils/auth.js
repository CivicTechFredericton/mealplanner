import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const COOKIE_NAME = 'mealplannerAccessToken';

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