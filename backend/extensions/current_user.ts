import { makeExtendSchemaPlugin, gql } from "graphile-utils";
import md5 from 'md5';

interface CurrentUser {
  email: string;
}

const GravatarPlugin = makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      extend type CurrentUser {
        avatar: String! @requires(columns: ["email"])
      }
    `,
    resolvers: {
      CurrentUser: {
        avatar: async (currentUser: CurrentUser) => {
          const hashEmail = md5(currentUser.email);
          return `https://www.gravatar.com/avatar/${hashEmail}.png`;
        }
      }
    }
  };
});

export { GravatarPlugin };
