const express = require("express");
const { postgraphile } = require("postgraphile");
const { GravatarPlugin } = require("./extensions/current_user");
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
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), GravatarPlugin],
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
  pgSettings: {},
};

app.use(postgraphile( process.env.DATABASE_URL, "app", postgraphileOptions));

console.log("starting graphql server ...");
app.listen(4000);