import { gql } from "urql";

export const REGISTER_MUT = gql`
	mutation Register($username: String!, $password: String!) {
		register(options: { username: $username, password: $password }) {
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