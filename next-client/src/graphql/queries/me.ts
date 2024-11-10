import { gql } from "urql";

export const ME_QUERY = gql`
	query Me {
		me {
			_id
			username
		}
	}
`;
