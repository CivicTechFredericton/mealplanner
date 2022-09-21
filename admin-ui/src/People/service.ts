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
) => {
    const result = await client.mutate(
        {mutation: resetPasswordMutation,
            variables: {personId, passwd: password}
        }
    );
}