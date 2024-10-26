"use client";
import { Anchor, Title, Text, Container } from "@mantine/core";
import React from "react";
import { LoginForm } from "./loginForm";
import classes from "./loginPage.module.css";

interface loginProps {}

const Register: React.FC<loginProps> = () => {
	return (
		<>
			<Container size={420} my={40}>
				<Title ta="center" className={classes.title}>
					Login here!
				</Title>
				<Text c="dimmed" size="sm" ta="center" mt={5}>
					Do not have an account yet?{" "}
					<Anchor size="sm" href="http://localhost:3000/register">
						Create account
					</Anchor>
				</Text>
				<div>
					<LoginForm />
				</div>
			</Container>
		</>
	);
};

export default Register;
