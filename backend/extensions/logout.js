const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
const md5 = require('md5');

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
        logout: async (_query, args, context, resolveInfo)  => {
          context.clearAuthCookie();
          return {status: "success"};
        }
      }
    }
  }
});

module.exports = { LogoutPlugin };