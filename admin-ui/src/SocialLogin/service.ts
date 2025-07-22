import { ApolloClient, gql } from "@apollo/client";

export const registerSocialLoginUserMutation = gql`
	mutation RegisterSocialLoginUser( $fullName: String! $loginMode: LoginMode! $email: String!) {
		createSocialLoginUser(
		input: {
			socialLoginUser: {
				fullName: $fullName
				loginMode: $loginMode
				email: $email
			}
		}
		) {
		socialLoginUser {
			rowId
			fullName
			createdAt
		}
		}
	}
`;

export const registerSocialLoginUser = async (
	client: ApolloClient<object>,
	fullName: string,
	loginMode: string,
	email: string
): Promise<void> => {
	let result = await client.mutate({
		mutation: registerSocialLoginUserMutation,
		variables: { fullName, loginMode, email }
	});
	return;
}

