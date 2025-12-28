import { makeExtendSchemaPlugin, gql } from "graphile-utils";

interface LogoutContext {
  clearAuthCookie: () => void;
}

const LogoutPlugin = makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      type LogoutPayload {
        status: String
      }
      extend type Mutation {
        logout: LogoutPayload!
      }
    `,
    resolvers: {
      Mutation: {
        logout: async (_query: unknown, _args: unknown, context: LogoutContext, _resolveInfo: unknown) => {
          context.clearAuthCookie();
          return { status: "success" };
        }
      }
    }
  };
});

export { LogoutPlugin };
