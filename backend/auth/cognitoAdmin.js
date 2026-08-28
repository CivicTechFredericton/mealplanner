const {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

// The region and the pool id both live inside the issuer URL, for example
// https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ABC123. Deriving them
// avoids asking for two more environment variables that could drift out of
// step with the issuer.
function parseIssuer(issuer) {
  const match = (issuer || "").match(
    /cognito-idp\.([^.]+)\.amazonaws\.com\/(.+?)\/?$/
  );
  if (!match) {
    return null;
  }
  return { region: match[1], userPoolId: match[2] };
}

let cached;

// Returns null when AWS credentials are not configured, which is the normal
// state for local docker-compose. Callers decide whether that is an error.
// The SDK reads AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from the
// environment itself, so they are never handled here.
function getCognitoAdmin() {
  if (cached !== undefined) {
    return cached;
  }

  const parsed = parseIssuer(process.env.COGNITO_ISSUER);
  if (!parsed || !process.env.AWS_ACCESS_KEY_ID) {
    cached = null;
    return cached;
  }

  cached = {
    ...parsed,
    client: new CognitoIdentityProviderClient({ region: parsed.region }),
  };
  return cached;
}

// Creates the Cognito account for one person. Returns "created", or "exists"
// when they already had an account, which makes the caller safe to re-run.
async function createCognitoUser({ email, fullName, suppressEmail }) {
  const admin = getCognitoAdmin();
  if (!admin) {
    throw new Error("Cognito admin is not configured");
  }

  const userAttributes = [
    { Name: "email", Value: email },
    { Name: "email_verified", Value: "true" },
  ];
  if (fullName) {
    userAttributes.push({ Name: "name", Value: fullName });
  }

  const input = {
    UserPoolId: admin.userPoolId,
    Username: email,
    UserAttributes: userAttributes,
    DesiredDeliveryMediums: ["EMAIL"],
  };

  // SUPPRESS creates the account without emailing anyone. Used for testing
  // against a real pool.
  if (suppressEmail) {
    input.MessageAction = "SUPPRESS";
  }

  try {
    await admin.client.send(new AdminCreateUserCommand(input));
    return "created";
  } catch (err) {
    if (err.name === "UsernameExistsException") {
      return "exists";
    }
    throw err;
  }
}

module.exports = { parseIssuer, getCognitoAdmin, createCognitoUser };
