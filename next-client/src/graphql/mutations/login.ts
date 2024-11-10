import { gql } from "urql";

export const LOGIN_MUT = gql`
	mutation Login($options: UsernamePasswordInput!) {
		login(options: $options) {
			errors {
				field
				message
			}
			user {
				_id
				username
			}
		}
	}
`;
