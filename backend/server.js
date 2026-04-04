// @ts-check
const express = require("express");
const { postgraphile, makePluginHook } = require("postgraphile");
const { GravatarPlugin } = require("./extensions/current_user");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const PgSimplifyInflector = require("@graphile-contrib/pg-simplify-inflector");
const opHook = require("@graphile/operation-hooks").default;
const OperationMessagesPlugin = require("@graphile/operation-hooks/lib/OperationMessagesPlugin").default;
const LoginPlugin = require("./hooks/login_plugin");
const session = require("cookie-session");
const { LogoutPlugin } = require("./extensions/logout");
const { CognitoJwtVerifier } = require("aws-jwt-verify");
const { CognitoIdentityProviderClient, ListUsersCommand } = require("@aws-sdk/client-cognito-identity-provider");

const cognitoVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id",
  clientId: process.env.COGNITO_CLIENT_ID,
});

const app = express();
app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.JWT_SECRET,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  })
);

const pluginHook = makePluginHook([opHook]);

/** @type{import("postgraphile").PostGraphileOptions} */
const postgraphileOptions = {
  subscriptions: true,
  operationMessages: true,
  operationMessagesPreflight: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: true,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  pluginHook: pluginHook,
  appendPlugins: [
    OperationMessagesPlugin,
    LoginPlugin,
    LogoutPlugin,
    PgSimplifyInflector,
    ConnectionFilterPlugin,
    GravatarPlugin,
  ],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain: true,
  enableQueryBatching: true,
  legacyRelations: "omit",
  ownerConnectionString: process.env.OWNER_DATABASE_URL,
  classicIds: true,
  enableCors: true,
  pgSettings: async (req) => {
    let role = "app_anonymous";
    if (req.session.role != null) {
      role = req.session.role;
    }

    /** @type {Record<string, any>} */
    const settings = {
      "jwt.claims.person_id": req.session.person_id,
      "jwt.claims.role": req.session.role,
      role: role,
    };

    // extract cognito claims from Bearer token if present
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.substring(7);
        const payload = await cognitoVerifier.verify(token);
        settings["jwt.claims.person_uuid"] = payload.sub;
        const groups = payload["cognito:groups"];
        if (groups && groups.length > 0) {
          settings["jwt.claims.role_uuid"] = groups[0];
          settings.role = groups[0];
        } else {
          settings.role = "app_user";
        }
      } catch (/** @type {any} */ err) {
        console.error("Cognito token verification failed:", err.message);
      }
    }

    return settings;
  },
  additionalGraphQLContextFromRequest: async (req) => {
    return {
      setAuthCookie: (personId, role) => {
        req.session.person_id = personId;
        req.session.role = role;
      },
      clearAuthCookie: () => {
        req.session = null
      }
    };
  },
};

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION || "us-east-2" });

app.get("/cognito-users", async (req, res) => {
  try {
    /** @type {{ uuid: string, displayName: string }[]} */
    const users = [];
    /** @type {string | undefined} */
    let paginationToken = undefined;
    while (true) {
      /** @type {import("@aws-sdk/client-cognito-identity-provider").ListUsersCommandOutput} */
      const result = await cognitoClient.send(new ListUsersCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        PaginationToken: paginationToken,
      }));
      for (const user of result.Users || []) {
        /** @type {import("@aws-sdk/client-cognito-identity-provider").AttributeType[]} */
        const attrs = user.Attributes || [];
        const sub = attrs.find(a => a.Name === "sub")?.Value;
        const displayName =
          attrs.find(a => a.Name === "name")?.Value ||
          attrs.find(a => a.Name === "email")?.Value ||
          user.Username;
        if (sub && displayName) {
          users.push({ uuid: sub, displayName });
        }
      }
      if (!result.PaginationToken) break;
      paginationToken = result.PaginationToken;
    }
    res.json(users);
  } catch (err) {
    console.error("[cognito-users] Failed to list all Cognito users:", err);
    res.status(500).json([]);
  }
});

app.post("/cognito-users", express.json(), async (req, res) => {
  const uuids = req.body.uuids;
  console.log("[cognito-users] received uuids:", uuids);
  if (!Array.isArray(uuids) || uuids.length === 0) {
    return res.json({});
  }

  try {
    const results = await Promise.all(
      uuids.map(uuid =>
        cognitoClient.send(new ListUsersCommand({
          UserPoolId: process.env.COGNITO_USER_POOL_ID,
          Filter: `sub = "${uuid}"`,
        }))
      )
    );

    /** @type {Record<string, string>} */
    const uuidToName = {};
    for (const response of results) {
      for (const user of response.Users || []) {
        const attrs = user.Attributes || [];
        const sub = attrs.find(a => a.Name === "sub")?.Value;
        const givenName = attrs.find(a => a.Name === "given_name")?.Value;
        const familyName = attrs.find(a => a.Name === "family_name")?.Value;
        const fullName = attrs.find(a => a.Name === "name")?.Value;
        const email = attrs.find(a => a.Name === "email")?.Value;

        const displayName =
          fullName ||
          (givenName && familyName ? `${givenName} ${familyName}` : givenName || familyName) ||
          email ||
          user.Username;

        if (sub && displayName) {
          uuidToName[sub] = displayName;
        }
      }
    }
    console.log("[cognito-users] result:", uuidToName);
    res.json(uuidToName);
  } catch (err) {
    console.error("[cognito-users] Failed to list Cognito users:", err);
    res.json({});
  }
});

app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://localhost:5432/",
    "app",
    postgraphileOptions
  )
);

let port = parseInt(process.env.PORT || "4000");
console.log(`starting graphql server on ${port} ...`);

app.listen(port);
