// @ts-check
const express = require("express");
const { postgraphile, makePluginHook } = require("postgraphile");
const { GravatarPlugin } = require("./extensions/current_user");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const PgSimplifyInflector = require('@graphile-contrib/pg-simplify-inflector');
const opHook = require('@graphile/operation-hooks').default;
const AuthPlugin = require('./hooks/auth_hook');
const session = require('express-session');
const { Session } = require("express-session");

const app = express();

app.use(session({
  secret: process.env.JWT_SECRET,
  cookie: {
    sameSite: "lax",
    httpOnly: true,
    // for production and to support CORS
    // secure: true,
    // sameSite: "none"
  }
}));

const pluginHook = makePluginHook([opHook]);

/** @type{import("postgraphile").PostGraphileOptions} */
const postgraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  pluginHook: pluginHook,
  appendPlugins: [AuthPlugin, PgSimplifyInflector, ConnectionFilterPlugin, GravatarPlugin],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain: true,
  enableQueryBatching: true,
  legacyRelations: "omit",
  ownerConnectionString: process.env.OWNER_DATABASE_URL,
  classicIds: true,
  enableCors: true,
  pgSettings: (req) => {
    return {
      "jwt.claims.person_id": req.session.person_id,
      "jwt.claims.role": req.session.role,
      // this is required as we cannot use pgDefaultRole anymnore
      // without the jwt token
      "role": "app_anonymous"
    }
  },
  additionalGraphQLContextFromRequest:  async (req) => {
    return {
      setAuthCookie: (personId, role) => {
        req.session.person_id = personId;
        req.session.role = role;
      }
    }
  }
};

app.use(postgraphile( process.env.DATABASE_URL || "postgres://localhost:5432/", "app", postgraphileOptions));

let port = parseInt(process.env.PORT || "4000");
console.log(`starting graphql server on ${port} ...`);

app.listen(port);
