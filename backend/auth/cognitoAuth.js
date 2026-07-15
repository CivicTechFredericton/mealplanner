if (!globalThis.crypto) {
  globalThis.crypto = require("crypto").webcrypto;
}

const issuer = process.env.COGNITO_ISSUER;
const appClientId = process.env.COGNITO_APP_CLIENT_ID;

let joseModulePromise;
let jwks;

async function getJose() {
  if (!joseModulePromise) {
    joseModulePromise = import("jose");
  }
  return joseModulePromise;
}

async function getJwks() {
  if (!issuer) return null;
  if (!jwks) {
    const { createRemoteJWKSet } = await getJose();
    jwks = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));
  }
  return jwks;
}

async function cognitoAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) return next();

  if (!issuer || !appClientId) {
    return res.status(500).json({ error: "Cognito env vars are not configured" });
  }

  const token = authHeader.slice("Bearer ".length).trim();

  try {
    const { jwtVerify } = await getJose();
    const jwksResolver = await getJwks();

    const { payload } = await jwtVerify(token, jwksResolver, {
      issuer,
      audience: appClientId,
    });

    if (payload.token_use !== "id") {
      return res.status(401).json({ error: "Expected Cognito ID token" });
    }

    req.cognitoClaims = {
      sub: payload.sub,
      email: payload.email || null,
      name: payload.name || null,
    };

    return next();
  } catch (err) {
    console.error("Cognito token verify failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { cognitoAuthMiddleware };
