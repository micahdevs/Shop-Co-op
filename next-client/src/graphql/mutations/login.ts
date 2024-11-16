import { gql } from "@urql/core";

export const LOGIN_MUT = gql`
	mutation Login($options: UsernamePasswordInput!) {
		login(options: $options) {
			errors {
				field
				message
			}
			user {
				...RegUser
			}
		}
	}
`;
