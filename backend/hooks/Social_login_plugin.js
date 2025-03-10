// @ts-check
/** @param {import("postgraphile").Build} build */
const useSocialAuthCredentials = (build) => {
    /** @param {import("postgraphile").Context} fieldContext */
    return (fieldContext) => {
      const { scope: { isRootMutation, pgFieldIntrospection } } = fieldContext;
      if (!isRootMutation) {
        return null;
      }
      if (!pgFieldIntrospection || pgFieldIntrospection.name !== 'person_details') {
        return null;
      }
      console.log('ready to setup social login hook...');
      return {
        before: [],
        after: [{
          priority: 100,
          callback: (result, args, context, resolvInfo) => {
            console.log('hook triggered for social login', result);
            if (result.data == null || !result.data["@jwtToken"]) {
              resolvInfo.graphileMeta.messages.push({
                level: "error",
                message: "invalid user credentials or login failed"
              });
            } else {
              // Set the JWT token from the response
              context.setAuthCookie(
                result.data["@jwtToken"].personId, 
                result.data["@jwtToken"].role
              );
            }
            return result;
          }
        }]
      }
    }
  }
  /** @type{import("postgraphile").Plugin} */
  const SocialLoginPlugin = (builder) => {
    builder.hook("init", (input, build) => {
      build.addOperationHook(useSocialAuthCredentials(build)); // Add social auth hook
      return input;
    });
  }
  module.exports = SocialLoginPlugin;