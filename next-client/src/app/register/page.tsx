import React from "react";
import { Anchor, Title, Text, Container } from "@mantine/core";
import classes from "./registerPage.module.css";
import { RegisterForm } from "./registerForm";

interface registerProps {}

const Register: React.FC<registerProps> = () => {
	return (
		<>
			<Container size={420} my={40}>
				<Title ta="center" className={classes.title}>
					Register here!
				</Title>
				<Text c="dimmed" size="sm" ta="center" mt={5}>
					Already have an account?{" "}
					<Anchor size="sm" href="http://localhost:3000/login">
						Login here
					</Anchor>
				</Text>
				<div>
					<RegisterForm />
				</div>
			</Container>
			;
		</>
	);
};

export default Register;
