import { gql } from "@urql/core";

export const CREATE_LIST = gql`
	mutation CreateList($input: ListInput!) {
		createList(input: $input) {
			_id
			title
			creatorId
			createdAt
			updatedAt
		}
	}
`;
