import { gql } from "@urql/core";

export const FORGOT_PASSWORD = gql`
	mutation ForgotPassword($email: String!) {
		forgotPassword(email: $email)
	}
`;
