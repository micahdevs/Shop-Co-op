import React from "react";
import { AuthenticationForm } from "../components/authenticationForm/authenticationForm";

interface registerProps {
	
}

const Register: React.FC<registerProps> = () => {
	return (
		<>
			<div>
				<AuthenticationForm />
			</div>
			;
		</>
	);
};

export default Register;
