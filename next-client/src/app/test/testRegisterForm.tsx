"use client";
import React, { InputHTMLAttributes } from "react";
import { Formik, Field, Form, FormikHelpers, useField } from "formik";
import { InputField } from "../components/InputField";
import { Button } from "@mantine/core";
import { useMutation } from "urql";
import { REGISTER_MUT } from "@/graphql/mutations/register";
import { Mutation, UsernamePasswordInput } from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

export const TestRegisterForm: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useMutation<Mutation>(REGISTER_MUT);

	// const handleSubmit = async (values: UsernamePasswordInput) => {
	// 	try {
	// 		const response = await register({
	// 			username: values.username,
	// 			password: values.password,
	// 		});

	// 		router.push("/");
	// 		console.log("successfully registered!", values);
	// 	} catch (error) {
	// 		console.log(console.error(error));
	// 	}
	// };
	return (
		<>
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register(values);
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
