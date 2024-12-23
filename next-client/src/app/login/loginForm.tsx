"use client";
import { Checkbox, Anchor, Paper, Group, Button } from "@mantine/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "../components/InputFields/InputField";
import { useMutation } from "urql";
import { LOGIN_MUT } from "@/graphql/mutations/login";

export const LoginForm: React.FC = () => {
	const router = useRouter();
	const [, login] = useMutation(LOGIN_MUT);

	return (
		<Formik
			initialValues={{ usernameOrEmail: "", password: "" }}
			onSubmit={async (values, { setErrors }) => {
				const response = await login(values);
				console.log(values);
				if (response.data?.login.errors) {
					setErrors(toErrorMap(response.data.login.errors));
				} else if (response.data?.login.user) {
					router.push("/");
				}
			}}
		>
			{({ isSubmitting }) => (
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<Form>
						<InputField
							name="usernameOrEmail"
							placeholder="Your Username or Email"
							label="Username or email"
							required
						/>

						<InputField
							name="password"
							placeholder="Your password"
							label="Password"
							type="password"
							required
						/>
						<Group justify="space-between" mt="lg">
							<Checkbox label="Remember me" />
							{/* Anchor tag or Link here? which is better 🤔 */}
							<Anchor href="http://localhost:3000/forgot-password" size="sm">
								Forgot password?
							</Anchor>
						</Group>
						<Button type="submit" loading={isSubmitting} fullWidth mt="xl">
							Login
						</Button>
					</Form>
				</Paper>
			)}
		</Formik>
	);
};
