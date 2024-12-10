import { gql } from "@urql/core";

export const RegUserFragment = gql`
	fragment RegUser on User {
		_id
		username
		email
	}
`;
