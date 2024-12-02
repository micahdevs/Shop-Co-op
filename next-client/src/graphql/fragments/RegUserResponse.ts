import { gql } from "@urql/core";

export const RegUserResponseFragment = gql`
	fragment RegUserResponse on UserResponse {
		errors {
			...RegError
		}
		user {
			...RegUser
		}
	}
`;
