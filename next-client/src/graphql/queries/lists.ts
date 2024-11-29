import { gql } from "@urql/core";

export const LISTS_QUERY = gql`
	query Lists {
		lists {
			title
			_id
			createdAt
			updatedAt
		}
	}
`;
