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