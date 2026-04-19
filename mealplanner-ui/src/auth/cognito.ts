const cfg = (window as any).__APP_CONFIG__ || {};

const domain = cfg.COGNITO_DOMAIN;
const clientId = cfg.COGNITO_APP_CLIENT_ID;
const redirectUri = cfg.COGNITO_REDIRECT_URI;
const logoutUri = cfg.COGNITO_LOGOUT_URI;

const KEY_VERIFIER = "cognito_pkce_verifier";
const KEY_STATE = "cognito_oauth_state";
const KEY_ID_TOKEN = "cognito_id_token";

function b64url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function randomString(length = 64) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (v) => chars[v % chars.length]).join("");
}

async function challengeFromVerifier(verifier: string) {
  const encoded = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return b64url(digest);
}

function ensureConfig() {
  if (!domain || !clientId || !redirectUri || !logoutUri) {
    throw new Error("Missing Cognito runtime config in window.__APP_CONFIG__");
  }
}

export async function startCognitoLogin(signup = false) {
  ensureConfig();

  const verifier = randomString(64);
  const state = randomString(32);
  const challenge = await challengeFromVerifier(verifier);

  sessionStorage.setItem(KEY_VERIFIER, verifier);
  sessionStorage.setItem(KEY_STATE, state);

  const url = new URL(`${domain}/oauth2/authorize`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "openid email");
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("state", state);
  url.searchParams.set("prompt", "login");

  if (signup) {
    url.searchParams.set("screen_hint", "signup");
  }

  window.location.assign(url.toString());
}

export function getIdToken() {
  return sessionStorage.getItem(KEY_ID_TOKEN);
}

export async function handleCognitoCallbackIfPresent() {
  ensureConfig();

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");

  if (!code) return false;

  const expectedState = sessionStorage.getItem(KEY_STATE);
  const verifier = sessionStorage.getItem(KEY_VERIFIER);

  if (!state || !expectedState || state !== expectedState || !verifier) {
    throw new Error("OAuth state/verifier mismatch");
  }

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("client_id", clientId);
  body.set("code", code);
  body.set("redirect_uri", redirectUri);
  body.set("code_verifier", verifier);

  const response = await fetch(`${domain}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status}`);
  }

  const data = await response.json();
  if (!data.id_token) {
    throw new Error("Missing id_token from Cognito");
  }

  sessionStorage.setItem(KEY_ID_TOKEN, data.id_token);
  sessionStorage.removeItem(KEY_VERIFIER);
  sessionStorage.removeItem(KEY_STATE);

  window.history.replaceState({}, "", "/#/mealplans");
  return true;
}

export function cognitoLogout() {
  ensureConfig();

  sessionStorage.removeItem(KEY_ID_TOKEN);
  sessionStorage.removeItem(KEY_VERIFIER);
  sessionStorage.removeItem(KEY_STATE);

  const url = new URL(`${domain}/logout`);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("logout_uri", logoutUri);

  window.location.assign(url.toString());
}
