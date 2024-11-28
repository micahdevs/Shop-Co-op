import { gql } from "@urql/core";

export const LOGOUT_MUT = gql`
	mutation Logout {
		logout
	}
`;
