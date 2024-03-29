// @ts-check


/** @param {import("postgraphile").Build} build */
const useAuthCredentials = (build) => {
  /** @param {import("postgraphile").Context} fieldContext */
  return (fieldContext) => {
    const {scope: {isRootMutation, pgFieldIntrospection}} = fieldContext;
    if(!isRootMutation) {
      return null;
    }
    if(!pgFieldIntrospection || pgFieldIntrospection.name !== 'authenticate') {
      return null;
    }
    // explaining the double negative. If pgFieldIntrospection is not null and has
    // the name 'authenticate' only then we need to run the following.
    console.log('ready to setup hook...');
    return {
      before: [],
      after: [{
        priority: 100,
        callback: (result, args, context, resolvInfo) => {
          console.log('hook triggered', result);
          if(result.data == null) {
            resolvInfo.graphileMeta.messages.push({
              level: "error",
              message: "invalid credentials"
            });
          } else {
            context.setAuthCookie(
              result.data['@jwtToken'].personId, 
              result.data['@jwtToken'].role);
          }
          return result;
        }
      }]
    }
  }
}

/** @type{import("postgraphile").Plugin} */
const LoginPlugin = (builder) => {
  builder.hook("init", (input, build) => {
    build.addOperationHook(useAuthCredentials(build));
    return input;
  });
}

module.exports = LoginPlugin;
