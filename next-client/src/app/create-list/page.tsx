"use client";
import { Paper, Button } from "@mantine/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";

// SHOULD ADD SOME FORM VALIDATION

const CreateList: React.FC = ({}) => {
	return (
		<Formik
			initialValues={{ usernameOrEmail: "", password: "" }}
			onSubmit={async (values) => {
				console.log(values);
			}}
		>
			{({ isSubmitting }) => (
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<Form>
						<InputField name="title" placeholder="title" label="Title" />

						<InputField
							name="text"
							placeholder="text..."
							label="Body"
						/>
						<Button type="submit" loading={isSubmitting} fullWidth mt="xl">
							Create list
						</Button>
					</Form>
				</Paper>
			)}
		</Formik>
	);
};

export default CreateList;
