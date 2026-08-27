const { makeExtendSchemaPlugin, gql } = require("graphile-utils");
const { getCognitoAdmin, createCognitoUser } = require("../auth/cognitoAdmin");

// Creates Cognito logins for people who were imported from a CSV but do not
// have an account yet. Kept separate from the import itself so an admin can
// check the list, and set roles, before anybody is emailed. Invitation emails
// cannot be unsent.
const ProvisionCognitoPlugin = makeExtendSchemaPlugin(() => ({
  typeDefs: gql`
    type ProvisionCognitoFailure {
      email: String!
      reason: String!
    }

    type ProvisionCognitoPayload {
      created: Int!
      alreadyExisted: Int!
      failures: [ProvisionCognitoFailure!]!
    }

    extend type Mutation {
      """
      Creates Cognito accounts for imported people who do not have one yet.
      Safe to run more than once, anyone who already has an account is
      counted under alreadyExisted and skipped. Pass suppressEmail to create
      the accounts without sending invitations, which is only useful for
      testing.
      """
      provisionCognitoAccounts(
        suppressEmail: Boolean = false
      ): ProvisionCognitoPayload!
    }
  `,
  resolvers: {
    Mutation: {
      provisionCognitoAccounts: async (_query, args, context) => {
        const roleResult = await context.pgClient.query(
          "select current_setting('jwt.claims.role', true) as role"
        );
        if (roleResult.rows[0] && roleResult.rows[0].role !== "app_admin") {
          throw new Error("Only an admin can provision Cognito accounts");
        }

        if (!getCognitoAdmin()) {
          throw new Error(
            "Cognito admin is not configured. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY."
          );
        }

        // cognito_sub is null until the person signs in for the first time.
        // Anyone already provisioned but not yet arrived is caught by the
        // UsernameExistsException path rather than tracked separately.
        const { rows } = await context.pgClient.query(
          "select email, full_name from app.person where cognito_sub is null order by id"
        );

        let created = 0;
        let alreadyExisted = 0;
        const failures = [];

        for (const row of rows) {
          try {
            const outcome = await createCognitoUser({
              email: row.email,
              fullName: row.full_name,
              suppressEmail: args.suppressEmail,
            });
            if (outcome === "created") {
              created += 1;
            } else {
              alreadyExisted += 1;
            }
          } catch (err) {
            failures.push({
              email: row.email,
              reason: err.name || err.message || "unknown error",
            });
          }
        }

        return { created, alreadyExisted, failures };
      },
    },
  },
}));

module.exports = { ProvisionCognitoPlugin };
