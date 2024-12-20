"use client";
import { InputField } from "@/app/components/InputField";
import { toErrorMap } from "@/app/utils/toErrorMap";
import { CHANGE_PASSWORD } from "@/graphql/mutations/changePassword";
import { Paper, Button, Text } from "@mantine/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import Link from "next/link";
import { useMutation } from "urql";

interface ChangePasswordProps {
	params: {
		token: string;
	};
}

// This may or may not need to be asynchronous...
const ChangePassword: FC<ChangePasswordProps> = ({ params }) => {
	const router = useRouter();
	const [tokenError, setTokenError] = useState("");
	const { token } = params;
	const [, changePassword] = useMutation(CHANGE_PASSWORD);
	return (
		<>
			<Formik
				initialValues={{ newPassword: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await changePassword({
						newPassword: values.newPassword,
						token,
					});
					console.log(values);
					if (response.data?.changePassword.errors) {
						const errorMap = toErrorMap(response.data.changePassword.errors);
						if ("token" in errorMap) {
							setTokenError(errorMap.token);
						}

						setErrors(toErrorMap(response.data.changePassword.errors));
					} else if (response.data?.changePassword.user) {
						router.push("/");
					}
				}}
			>
				{({ isSubmitting }) => (
					<Paper withBorder shadow="md" p={30} mt={30} radius="md">
						<Form>
							<InputField
								name="newPassword"
								placeholder="new password"
								label="New Password"
								type="password"
							/>
							{tokenError ? <Text c="red">{tokenError}</Text> : null}
							<Link href="/forgot-password">
								Click here to get a fresh token
							</Link>

							<Button type="submit" loading={isSubmitting} fullWidth mt="xl">
								change password
							</Button>
						</Form>
					</Paper>
				)}
			</Formik>
			<div>
				<h1>Change Your Password</h1>
				<p>
					Your password reset token: <strong>{token}</strong>
				</p>
			</div>
		</>
	);
};

export default ChangePassword;
