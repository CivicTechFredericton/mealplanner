const { makeExtendSchemaPlugin, gql } = require("graphile-utils");
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = "";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const VerifyGoogleTokenPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      extend type Mutation {
        verifyGoogleToken(idToken: String!, email: String!): VerifyGoogleTokenPayload!
      }
      type VerifyGoogleTokenPayload {
        success: Boolean!
      }
    `,
    resolvers: {
      Mutation: {
        verifyGoogleToken: async (_query, args) => {
          const { idToken, email } = args;
          console.log("GOOGLE CLIENT ID"+GOOGLE_CLIENT_ID);
          try {
            const ticket = await client.verifyIdToken({
              idToken,
              audience: GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload || payload.email !== email) {
              throw new Error("Email mismatch or invalid token");
            }
            console.log("Google Token verified using plugin")
            return { success: true };
          } catch (error) {
            console.error("Google Token Verification Failed:", error);
            return { success: false };
          }
        },
      },
    },
  };
});
module.exports = VerifyGoogleTokenPlugin;