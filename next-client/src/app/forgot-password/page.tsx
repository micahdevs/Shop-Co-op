import { Paper, Button } from "@mantine/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "@/generated/graphql";

const ForgotPasswordPage: React.FC = ({}) => {
	const [complete, setComplete] = useState(false);
	const [, forgotPassword] = useForgotPasswordMutation();
	return (
		<Formik
			initialValues={{ email: "" }}
			onSubmit={async (values) => {
				await forgotPassword(values);
				setComplete(true);
			}}
		>
			{({ isSubmitting }) =>
				complete ? (
					<Paper>if an account with that email exists, we sent an email</Paper>
				) : (
					<Paper withBorder shadow="md" p={30} mt={30} radius="md">
						<Form>
							<InputField
								name="email"
								placeholder="email"
								label="Email"
								type="email"
								required
							/>
							<Button type="submit" loading={isSubmitting} fullWidth mt="xl">
								Forgot password
							</Button>
						</Form>
					</Paper>
				)
			}
		</Formik>
	);
};

export default ForgotPasswordPage;
