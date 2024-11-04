import React, { InputHTMLAttributes } from "react";
import { TextInput } from "@mantine/core";
import { Formik, Field, Form, FormikHelpers, useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
	size: _, // remove size from being passed (incompatible)
	...props
}) => {
	const [field, { error }] = useField(props);
	return (
		<>
			<TextInput {...field} {...props} id={field.name} mb="md" error={error} />
		</>
	);
};
