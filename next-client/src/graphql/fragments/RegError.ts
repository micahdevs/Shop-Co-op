import { gql } from "@urql/core";

export const RegErrorFragment = gql`
	fragment RegError on FieldError {
		field
		message
	}
`;
