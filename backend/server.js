const express = require("express");
const { postgraphile } = require("postgraphile");
const { GravatarPlugin } = require("./extensions/current_user");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");

const app = express();

const postgraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), ConnectionFilterPlugin, GravatarPlugin],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain: true,
  enableQueryBatching: true,
  jwtPgTypeIdentifier: "app.jwt_token",
  jwtSecret: process.env.JWT_SECRET,
  legacyRelations: "omit",
  pgDefaultRole: "app_anonymous",
  ownerConnectionString: process.env.OWNER_DATABASE_URL,
  classicIds: true,
  enableCors: true,
  pgSettings: {},
};

app.use(postgraphile( process.env.DATABASE_URL, "app", postgraphileOptions));

let port = parseInt(process.env.PORT || "4000");
console.log("starting graphql server ...");

app.listen(port);
