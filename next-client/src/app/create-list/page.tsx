"use client";
import { CREATE_LIST } from "@/graphql/mutations/createList";
import { Button, Container, Paper, Center } from "@mantine/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import { InputField } from "../components/InputFields/InputField";
import { useIsAuth } from "../utils/useIsAuth";
import { useMutation } from "urql";
import { EditableTitle } from "../components/EditableTitle/EditableTitle";
import { InputWithButton } from "../components/InputFields/InputWithButton";

// SHOULD ADD SOME FORM VALIDATION

const CreateList: React.FC = ({}) => {
	const router = useRouter();
	useIsAuth();
	const [, createList] = useMutation(CREATE_LIST);
	const [items, setItems] = useState<string[]>([]);
	const [newItem, setNewItem] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewItem(event.target.value);
	};

	const addItem = () => {
		setItems([...items, newItem]);
		setNewItem("");
	};
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
				<Container size={420} my={40}>
					<Paper withBorder shadow="md" p={30} mt={30} radius="md">
						<Form>
							<Center>
								<EditableTitle label="title" name="title" />
							</Center>

							<InputWithButton
								name="text"
								placeholder="...add items"
								label=""
								onChange={handleChange}
							/>
							<button onClick={addItem}>Add Item!!</button>
							<div>
								<ul>
									{items.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							</div>

							<Button type="submit" loading={isSubmitting} fullWidth mt="xl">
								Create list
							</Button>
						</Form>
					</Paper>
				</Container>
			)}
		</Formik>
	);
};

export default CreateList;
