"use client";
import { useCreateListMutation } from "@/generated/graphql";
import { Button, Paper } from "@mantine/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { InputField } from "../components/InputField";
import { useIsAuth } from "../utils/useIsAuth";

// SHOULD ADD SOME FORM VALIDATION

const CreateList: React.FC = ({}) => {
	const router = useRouter();
	useIsAuth();
	const [, createList] = useCreateListMutation();
	return (
		<Formik
			initialValues={{ title: "", text: "" }}
			onSubmit={async (values) => {
				const { error } = await createList({ input: values });
				if (!error) {
					router.push("/");
				}
			}}
		>
			{({ isSubmitting }) => (
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<Form>
						<InputField name="title" placeholder="title" label="Title" />

						<InputField name="text" placeholder="text..." label="Body" />
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
