import { gql } from "@urql/core";

export const ME_QUERY = gql`
	query Me {
		me {
			...RegUser
		}
	}
`;
