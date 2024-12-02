import { gql } from "@urql/core";

export const LOGIN_MUT = gql`
	mutation Login($usernameOrEmail: String!, $password: String!) {
		login(usernameOrEmail: $usernameOrEmail, password: $password) {
			...RegUserResponse
		}
	}
`;
