"use client";
import { Paper, Button } from "@mantine/core";
import { useRegisterMutation } from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "../components/InputField";

export const RegisterForm: React.FC = () => {
	const router = useRouter();
	const [, register] = useRegisterMutation();

	return (
		<Formik
			initialValues={{ username: "", password: "" }}
			onSubmit={async (values, { setErrors }) => {
				const response = await register({ options: values });
				console.log(values);
				if (response.data?.register.errors) {
					setErrors(toErrorMap(response.data.register.errors));
				} else if (response.data?.register.user) {
					router.push("/");
				}
			}}
		>
			{({ isSubmitting }) => (
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<Form>
						<InputField
							name="username"
							placeholder="username"
							label="Username"
						/>
						<InputField
							name="password"
							placeholder="password"
							label="Password"
							type="password"
						/>
						<Button type="submit" loading={isSubmitting} fullWidth mt="xl">
							Register
						</Button>
					</Form>
				</Paper>
			)}
		</Formik>
	);
};
