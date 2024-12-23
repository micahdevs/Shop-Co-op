"use client";
import { Paper, Button } from "@mantine/core";
// import { useRegisterMutation } from "@/generated/graphql";
import { useMutation } from "urql";
import { REGISTER_MUT } from "@/graphql/mutations/register";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "../components/InputFields/InputField";

export const RegisterForm: React.FC = () => {
	const router = useRouter();
	const [, register] = useMutation(REGISTER_MUT);

	return (
		<Formik
			initialValues={{ email: "", username: "", password: "" }}
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
							placeholder="Enter a username"
							label="Username"
						/>
						<InputField name="email" placeholder="Your email" label="Email" />
						<InputField
							name="password"
							placeholder="Enter a password"
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
