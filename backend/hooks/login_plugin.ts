import { Build, Plugin } from "postgraphile";

interface AuthResult {
  data?: {
    '@jwtToken'?: {
      personId: string;
      role: string;
    };
  } | null;
}

interface AuthContext {
  setAuthCookie: (personId: string, role: string) => void;
}

interface ResolveInfo {
  graphileMeta: {
    messages: Array<{
      level: string;
      message: string;
    }>;
  };
}

const useAuthCredentials = (build: Build) => {
  return (fieldContext: any) => {
    const { scope: { isRootMutation, pgFieldIntrospection } } = fieldContext;
    if (!isRootMutation) {
      return null;
    }
    if (!pgFieldIntrospection || pgFieldIntrospection.name !== 'authenticate') {
      return null;
    }
    // explaining the double negative. If pgFieldIntrospection is not null and has
    // the name 'authenticate' only then we need to run the following.
    console.log('ready to setup hook...');
    return {
      before: [],
      after: [{
        priority: 100,
        callback: (result: AuthResult, _args: unknown, context: AuthContext, resolveInfo: ResolveInfo) => {
          console.log('hook triggered', result);
          if (result.data == null) {
            resolveInfo.graphileMeta.messages.push({
              level: "error",
              message: "invalid credentials"
            });
          } else {
            const jwtToken = result.data['@jwtToken'];
            if (jwtToken) {
              context.setAuthCookie(jwtToken.personId, jwtToken.role);
            }
          }
          return result;
        }
      }]
    };
  };
};

const LoginPlugin: Plugin = (builder) => {
  builder.hook("init", (input, build) => {
    build.addOperationHook(useAuthCredentials(build));
    return input;
  });
};

export default LoginPlugin;
