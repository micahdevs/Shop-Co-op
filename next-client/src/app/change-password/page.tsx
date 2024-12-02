import Link from "next/link";
import { FC } from "react";

const ChangePasswordPage = () => {

	return (
		<>
			<div>
				<h1>Password Reset</h1>
				<p>Click the link below to reset your password:</p>
				<Link href={`/change-password`}>Reset Password</Link>
			</div>
		</>
	);
};

export default ChangePasswordPage;
