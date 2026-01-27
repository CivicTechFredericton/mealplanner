import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Issuer, generators } from 'openid-client';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Validate required env variables
const REQUIRED_ENV = [
  'COGNITO_REGION',
  'COGNITO_USER_POOL_ID',
  'COGNITO_CLIENT_ID',
  'COGNITO_CLIENT_SECRET',
  'COGNITO_REDIRECT_URI',
];

for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    throw new Error(`Missing env variable: ${key}`);
  }
}

// Extend session types for TS
declare module 'express-session' {
  interface SessionData {
    nonce?: string;
    state?: string;
    userInfo?: any;
  }
}

const app = express();

// Setup session
app.use(
  session({
    secret: 'mealplanner-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // true if HTTPS
  })
);

let client: any;

// Initialize Cognito OIDC client
async function initializeClient() {
  const issuerUrl = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;

  console.log('Discovering issuer:', issuerUrl);
  const issuer = await Issuer.discover(issuerUrl);
  console.log('✅ Issuer discovered:', issuer.issuer);

  client = new issuer.Client({
    client_id: process.env.COGNITO_CLIENT_ID!,
    client_secret: process.env.COGNITO_CLIENT_SECRET!,
    redirect_uris: [process.env.COGNITO_REDIRECT_URI!],
    response_types: ['code'],
  });

  console.log('✅ OIDC client initialized');
}

// Routes
async function setupRoutes() {
  // Login route
  app.get('/api/login', (req, res) => {
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
      scope: 'openid email profile',
      response_mode: 'query', // important for Cognito
      nonce,
      state,
    });

    res.redirect(authUrl);
  });

  // Callback route
  app.get('/api/callback', async (req, res) => {
    try {
      const params = client.callbackParams(req);

      const tokenSet = await client.callback(
        process.env.COGNITO_REDIRECT_URI!,
        params,
        {
          nonce: req.session.nonce,
          state: req.session.state,
        }
      );

      const userInfo = await client.userinfo(tokenSet.access_token);
      req.session.userInfo = userInfo;

      console.log('✅ Logged in user:', userInfo);

      res.send(`Hello ${userInfo.email}! <a href="/api/logout">Logout</a>`);
    } catch (err) {
      console.error('Callback error:', err);
      res.status(500).send('Login failed');
    }
  });

  // Logout route
  app.get('/api/logout', (req, res) => {
    req.session.destroy(() => {});
    const logoutUrl = `https://${process.env.COGNITO_REGION}.auth.${process.env.COGNITO_REGION}.amazoncognito.com/logout?client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.COGNITO_REDIRECT_URI}`;
    res.redirect(logoutUrl);
  });

  // Home route
  app.get('/', (req, res) => {
    if (req.session.userInfo) {
      res.send(`Hello ${req.session.userInfo.email}! <a href="/api/logout">Logout</a>`);
    } else {
      res.send('Not logged in. <a href="/api/login">Login</a>');
    }
  });
}

// Start server
(async () => {
  try {
    await initializeClient();
    await setupRoutes();

    app.listen(4000, () => {
      console.log('🚀 Server running at http://localhost:4000');
    });
  } catch (err) {
    console.error('Startup error:', err);
  }
})();
