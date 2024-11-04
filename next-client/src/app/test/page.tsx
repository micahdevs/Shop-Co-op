import React from "react";
import { TestRegisterForm } from "./testRegisterForm";

interface testComponentProps {}

const TestComponent: React.FC<testComponentProps> = () => {
	return (
		<>
			<div>
				<TestRegisterForm />
			</div>
		</>
	);
};

export default TestComponent;
