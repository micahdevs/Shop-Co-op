import { gql } from "@urql/core";

export const REGISTER_MUT = gql`
	mutation Register($options: UsernamePasswordInput!) {
		register(options: $options) {
			user {
				_id
				username
				email
			}
			errors {
				field
				message
			}
		}
	}
`;
