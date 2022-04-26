const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
const md5 = require('md5');

const LogoutPlugin = makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      extend type Mutation {
        logout: String
      }
    `,
    resolvers: {
      Mutation: {
        logout: async (_query, args, context, resolveInfo)  => {
          context.clearAuthCookie();
          return "success";
        }
      }
    }
  }
});

module.exports = { LogoutPlugin };