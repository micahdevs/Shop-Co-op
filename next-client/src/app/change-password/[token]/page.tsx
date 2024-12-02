import { FC } from "react";

interface ChangePasswordProps {
	params: {
		token: string;
	};
}

// This may or may not need to be asynchronous...
const ChangePassword: FC<ChangePasswordProps> = ({ params }) => {
	const { token } = params;

	return (
		<div>
			<h1>Change Your Password</h1>
			<p>
				Your password reset token: <strong>{token}</strong>
			</p>
		</div>
	);
};

export default ChangePassword;
