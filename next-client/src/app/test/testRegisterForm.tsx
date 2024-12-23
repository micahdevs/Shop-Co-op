"use client";
import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputFields/InputField";
import { Button } from "@mantine/core";
import { useMutation } from "urql";
import { REGISTER_MUT } from "@/graphql/mutations/register";
import { Mutation } from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

export const TestRegisterForm: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useMutation<Mutation>(REGISTER_MUT);

	return (
		<>
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register(values);
					router.push("/");
					console.log(values);
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					}
				}}
			>
				{({ isSubmitting }) => (
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
						<Button type="submit" loading={isSubmitting}>
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};
