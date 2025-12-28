import express, { Request } from "express";
import { IncomingMessage, ServerResponse } from "http";
import { postgraphile, makePluginHook, PostGraphileOptions } from "postgraphile";
import { GravatarPlugin } from "./extensions/current_user.ts";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import PgSimplifyInflector from "@graphile-contrib/pg-simplify-inflector";
import opHook from "@graphile/operation-hooks";
import { OperationHooksPlugin } from "@graphile/operation-hooks";
import LoginPlugin from "./hooks/login_plugin.ts";
import session from "cookie-session";
import { LogoutPlugin } from "./extensions/logout.ts";

// Extend Express Request type to include session properties
declare module "express-serve-static-core" {
  interface Request {
    session: {
      person_id?: string;
      role?: string;
    } | null;
  }
}

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

const postgraphileOptions: PostGraphileOptions = {
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
    OperationHooksPlugin,
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
  pgSettings: async (req: IncomingMessage) => {
    const expressReq = req as Request;
    let role = "app_anonymous";
    if (expressReq.session?.role != null) {
      role = expressReq.session.role;
    }
    return {
      "jwt.claims.person_id": expressReq.session?.person_id,
      "jwt.claims.role": expressReq.session?.role,
      // this is required as we cannot use pgDefaultRole anymnore
      // without the jwt token
      role: role,
    };
  },
  additionalGraphQLContextFromRequest: async (req: IncomingMessage, _res: ServerResponse) => {
    const expressReq = req as Request;
    return {
      setAuthCookie: (personId: string, role: string) => {
        if (expressReq.session) {
          expressReq.session.person_id = personId;
          expressReq.session.role = role;
        }
      },
      clearAuthCookie: () => {
        expressReq.session = null;
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

const port = parseInt(process.env.PORT || "4000");
console.log(`starting graphql server on ${port} ...`);

app.listen(port);
