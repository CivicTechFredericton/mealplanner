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
const { ProvisionCognitoPlugin } = require("./extensions/provision_cognito");
const { cognitoAuthMiddleware } = require("./auth/cognitoAuth");
const { resolveCognitoPerson } = require("./auth/resolveCognitoPerson");

const app = express();
app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.JWT_SECRET,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  })
);
app.use(cognitoAuthMiddleware);
app.use(resolveCognitoPerson);


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
    ProvisionCognitoPlugin,
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
  if (req.cognitoAuth?.person_id && req.cognitoAuth?.role) {
    return {
      "jwt.claims.person_id": String(req.cognitoAuth.person_id),
      "jwt.claims.role": req.cognitoAuth.role,
      role: req.cognitoAuth.role,
    };
  }

  let role = "app_anonymous";
  if (req.session.role != null) {
    role = req.session.role;
  }

  return {
    "jwt.claims.person_id": req.session.person_id,
    "jwt.claims.role": req.session.role,
    role,
  };
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
