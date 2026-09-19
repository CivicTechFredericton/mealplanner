import { ApolloClient, gql } from "@apollo/client";

const registerPersonMutation = gql`
    mutation RegisterPerson($fullName:String, $email: String, $password: String){
        registerPerson(
        input:{fullName:$fullName,
        email:$email,
        password:$password}
        ) {
        person {
            rowId
            id
            fullName
            createdAt
        }
        }
    }
`;

export const registerPerson = async (
    client: ApolloClient<object>, 
    fullName: string,
    email: string,
    password: string
    ):Promise<void> => {
       let result = await client.mutate({
        mutation: registerPersonMutation,
        variables: {fullName, email, password}
       });
       return;
}

const importPersonMutation = gql`
  mutation ImportPerson($email: String!, $clientId: String, $fullName: String) {
    importPerson(
      input: { pEmail: $email, pClientId: $clientId, pFullName: $fullName }
    ) {
      person {
        rowId
        email
        clientId
        fullName
        role
      }
    }
  }
`;

export type ImportedPerson = {
  rowId: string;
  email: string;
  clientId: string | null;
  fullName: string;
  role: string;
};

// Imports a single CSV row. app.import_person decides whether that means
// creating a person, updating an email, or doing nothing, so the caller does
// not need to know which. Errors from the function surface as thrown Apollo
// errors and are reported per row by the caller.
export const importPerson = async (
  client: ApolloClient<object>,
  email: string,
  clientId: string | null,
  fullName: string | null
): Promise<ImportedPerson> => {
  const result = await client.mutate({
    mutation: importPersonMutation,
    variables: { email, clientId, fullName },
  });
  return result.data.importPerson.person;
};

const provisionCognitoAccountsMutation = gql`
  mutation ProvisionCognitoAccounts($personIds: [BigInt!]) {
    provisionCognitoAccounts(personIds: $personIds) {
      created
      resent
      alreadyExisted
      failures {
        email
        reason
      }
    }
  }
`;

export type ProvisionResult = {
  created: number;
  resent: number;
  alreadyExisted: number;
  failures: { email: string; reason: string }[];
};

// Sends Cognito invitations, which is what emails people their temporary
// password. Without personIds, invites everyone never invited before. With
// personIds, invites those people and resends to any already invited who have
// not signed in yet.
export const provisionCognitoAccounts = async (
  client: ApolloClient<object>,
  personIds?: (string | number)[]
): Promise<ProvisionResult> => {
  const result = await client.mutate({
    mutation: provisionCognitoAccountsMutation,
    variables: { personIds: personIds ? personIds.map(String) : null },
  });
  return result.data.provisionCognitoAccounts;
};

const resetPasswordMutation = gql`
mutation ResetPassword($personId:BigInt, $passwd:String){
  resetPassword(input:{
    pId:$personId,
    passwd:$passwd
  }) {
    person {
      rowId
      id
      role
      fullName
      email
    	updatedAt
    }
  }
}`;

export const resetPassword = async (
  client: ApolloClient<object>,
  personId: string,
  password: string
): Promise<void> => {
  let result = await client.mutate({
    mutation: resetPasswordMutation,
    variables: { personId: personId, passwd: password },
  });
};