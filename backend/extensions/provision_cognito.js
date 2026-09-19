const { makeExtendSchemaPlugin, gql } = require("graphile-utils");
const {
  getCognitoAdmin,
  createCognitoUser,
  resendInvitation,
} = require("../auth/cognitoAdmin");

// Exported on its own as well as through the plugin, so it can be exercised
// against a real database session without a Cognito login.
async function provisionCognitoAccounts(_query, args, context) {
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

  const selected = args.personIds && args.personIds.length > 0;
  const personIds = selected ? args.personIds.map(String) : null;

  // cognito_sub is null until the person signs in for the first time,
  // so anyone who has signed in is never picked up here.
  //
  // Invite everyone only looks at people never invited. A selection
  // includes the already invited too, because resending to them is the
  // point of selecting them.
  const { rows } = await context.pgClient.query(
    `select id, email, full_name, invited_at
       from app.person
      where cognito_sub is null
        and ($1::bigint[] is null or id = any($1::bigint[]))
        and ($1::bigint[] is not null or invited_at is null)
      order by id`,
    [personIds]
  );

  let created = 0;
  let resent = 0;
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
      } else if (!args.suppressEmail) {
        // The account exists but our records have no invitation, or this
        // person was selected for a resend. Either way send one. An account
        // can exist without anyone having been emailed, and a person in that
        // state cannot use forgot password, so skipping them would strand
        // them. A duplicate email is the lesser problem.
        await resendInvitation({ email: row.email });
        resent += 1;
      } else {
        alreadyExisted += 1;
      }

      await context.pgClient.query(
        "update app.person set invited_at = now() where id = $1",
        [row.id]
      );
    } catch (err) {
      failures.push({
        email: row.email,
        reason: err.name || err.message || "unknown error",
      });
    }
  }

  return { created, resent, alreadyExisted, failures };
}

// Creates Cognito logins for people who were imported from a CSV, which is
// what emails them a temporary password. Kept separate from the import itself
// so an admin can check the list, and set roles, before anybody is emailed.
// Invitation emails cannot be unsent.
const ProvisionCognitoPlugin = makeExtendSchemaPlugin(() => ({
  typeDefs: gql`
    type ProvisionCognitoFailure {
      email: String!
      reason: String!
    }

    type ProvisionCognitoPayload {
      created: Int!
      resent: Int!
      alreadyExisted: Int!
      failures: [ProvisionCognitoFailure!]!
    }

    extend type Mutation {
      """
      Sends Cognito invitations to people who have not signed in yet.

      Without personIds, invites everyone who has never been invited. Nobody
      is emailed twice.

      With personIds, invites those people and resends to any of them who
      were already invited but have not signed in, for example because the
      first email went to spam. People who have signed in are skipped either
      way.

      Pass suppressEmail to create accounts without sending anything, which
      is only useful for testing.
      """
      provisionCognitoAccounts(
        personIds: [BigInt!]
        suppressEmail: Boolean = false
      ): ProvisionCognitoPayload!
    }
  `,
  resolvers: {
    Mutation: {
      provisionCognitoAccounts,
    },
  },
}));

module.exports = { ProvisionCognitoPlugin, provisionCognitoAccounts };
