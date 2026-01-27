import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();


const OpenIDClient = await import('openid-client'); // dynamic import
const { Issuer, generators } = OpenIDClient as any;

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false },
  })
);

let client: any;

async function initCognito() {
  if (!Issuer) {
    throw new Error('Issuer is undefined! OpenIDClient import failed.');
  }

  try {
    const issuer = await Issuer.discover(
      `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`
    );

    client = new issuer.Client({
      client_id: process.env.COGNITO_CLIENT_ID!,
      client_secret: process.env.COGNITO_CLIENT_SECRET!,
      redirect_uris: [process.env.COGNITO_REDIRECT_URI!],
      response_types: ['code'],
    });

    console.log('✅ Cognito OIDC client initialized');
  } catch (err) {
    console.error('❌ Failed to initialize Cognito client', err);
    process.exit(1);
  }
}

// Start server after Cognito is ready
await initCognito();

app.listen(PORT, () => {
  console.log(`🚀 Auth server running on http://localhost:${PORT}`);
});'''
