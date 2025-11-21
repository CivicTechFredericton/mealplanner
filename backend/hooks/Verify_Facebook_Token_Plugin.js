const { makeExtendSchemaPlugin, gql } = require("graphile-utils");
const axios = require("axios");
const FACEBOOK_APP_ID =  "";
const FACEBOOK_APP_SECRET = ""
const VerifyFacebookTokenPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      extend type Mutation {
        verifyFacebookToken(accessToken: String!, email: String!): VerifyFacebookTokenPayload!
      }
      type VerifyFacebookTokenPayload {
        success: Boolean!
      }
    `,
    resolvers: {
      Mutation: {
        verifyFacebookToken: async (_query, args) => {
          const { accessToken, email } = args;
          console.log("Facebook token "+FACEBOOK_APP_ID);
          console.log("Facebook app secret "+FACEBOOK_APP_SECRET);
          try {
            // Create an app access token using your Facebook App ID and App Secret
            const appAccessToken = `${FACEBOOK_APP_ID}|${FACEBOOK_APP_SECRET}`;
            // Debug the token using Facebook's debug_token endpoint
            const debugUrl = `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appAccessToken}`;
            const debugResponse = await axios.get(debugUrl);
            const debugData = debugResponse.data;
            if (!debugData.data || !debugData.data.is_valid) {
              throw new Error("Invalid Facebook token");
            }
            // Once the token is valid, get the user's email from the /me endpoint
            const meUrl = `https://graph.facebook.com/me?fields=email&access_token=${accessToken}`;
            const meResponse = await axios.get(meUrl);
            const meData = meResponse.data;
            if (!meData.email || meData.email !== email) {
              throw new Error("Email mismatch or token does not contain email");
            }
            console.log("Facebook token verified successfully");
            return { success: true };
          } catch (error) {
            console.error("Facebook Token Verification Failed:", error);
            return { success: false };
          }
        },
      },
    },
  };
});
module.exports = VerifyFacebookTokenPlugin;