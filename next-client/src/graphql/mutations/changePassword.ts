import { gql } from "@urql/core";

export const CHANGE_PASSWORD = gql`
	mutation ChangePassword($token: String!, $newPassword: String!) {
		changePassword(token: $token, newPassword: $newPassword) {
			errors {
				...RegError
			}
			user {
				...RegUser
			}
		}
	}
`;
