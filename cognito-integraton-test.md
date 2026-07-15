## Cognito Branch Setup Instructions

Please follow these steps to run and validate this branch.

### 1. Pull branch
```bash
git checkout 745-aws-cognito-integration
git pull
docker compose down
```

### 2. Update root `.env`
```javascript
COMPOSE_FILE=docker-compose-dev.yml
COGNITO_ISSUER=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_HwSEM4qwL
COGNITO_APP_CLIENT_ID=7d8ochjvbvg31fe6sv4nne9qrk
COGNITO_DOMAIN=https://us-east-1hwsem4qwl.auth.us-east-1.amazoncognito.com
COGNITO_REDIRECT_URI=http://localhost:3000/
COGNITO_LOGOUT_URI=http://localhost:3000/
GRAPHQL_ENDPOINT=/graphql
```

### 3. Run database migrations
```bash
docker compose run --rm migrator up
```

### 4. Rebuild and run services
```bash
docker compose up --build
```

**To setup a fresh AWS Cognito configuration Follow these steps**  

## AWS Cognito Setup

### 1. User Pool
- Create/use a User Pool.
- Sign-in identifier: **Email**
- Self-registration: **Enabled**
- Required attributes: **email** (name can be optional)

### 2. App Client
- Application type: **Single-page application (SPA)**
- OAuth flow: **Authorization Code Grant with PKCE**
- Identity provider enabled: **Cognito User Pool**

### 3. OAuth URLs (must match exactly)
- Callback URL: `http://localhost:3000/`
- Logout URL: `http://localhost:3000/`

### 4. OAuth Scopes
- Must include at least: `openid`, `email`
- Since current frontend now requests profile in `cognito.ts`, also enable: `profile`

### 5. Hosted UI Domain
- Configure Cognito domain, e.g.:
  - `https://<your-prefix>.auth.us-east-1.amazoncognito.com`

### 6. Values to copy into env
```bash
COGNITO_ISSUER=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_HwSEM4qwL
COGNITO_APP_CLIENT_ID=<your app client id>
COGNITO_DOMAIN=https://<your-prefix>.auth.us-east-1.amazoncognito.com
COGNITO_REDIRECT_URI=http://localhost:3000/
COGNITO_LOGOUT_URI=http://localhost:3000/
```

### 7. Common failure causes we hit
- `redirect_mismatch`: callback URL in Cognito not exact
- `invalid_scope`: missing scope in app client
- Hosted UI generic error: app client OAuth/login-pages setup incomplete




