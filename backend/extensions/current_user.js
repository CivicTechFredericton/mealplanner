const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
const md5 = require('md5');

const GravatarPlugin = makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      extend type CurrentUser {
        avatar: String! @requires(columns: ["email"])
      }
    `,
    resolvers: {
      CurrentUser: {
        avatar: async currentUser => {
          let hashEmail = md5(currentUser.email);
          return `https://www.gravatar.com/avatar/${hashEmail}.png`;
        }
      }
    }
  }
});

module.exports = { GravatarPlugin };