import { gql } from "@urql/core";

export const REGISTER_MUT = gql`
	mutation Register($options: UsernamePasswordInput!) {
		register(options: $options) {
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
