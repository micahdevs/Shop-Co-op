import { gql } from "urql";

export const REGISTER_MUT = gql`
	mutation Register($options: UsernamePasswordInput!) {
		register(options: $options) {
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