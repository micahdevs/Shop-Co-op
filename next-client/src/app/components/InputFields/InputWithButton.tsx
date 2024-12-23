import React, { InputHTMLAttributes } from "react";
import { IconPlus } from "@tabler/icons-react";
import { ActionIcon, TextInput, useMantineTheme } from "@mantine/core";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	name: string;
};

export const InputWithButton: React.FC<InputFieldProps> = ({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	size: _,
	...props
}) => {
	const theme = useMantineTheme();
	const [field, { error }] = useField(props);

	return (
		<TextInput
			radius="md"
			rightSectionWidth={42}
			rightSection={
				<ActionIcon size={32} radius="md" color={theme.primaryColor}>
					<IconPlus size={18} stroke={1.5} />
				</ActionIcon>
			}
			{...props}
			{...field}
			id={field.name}
			error={error}
		/>
	);
};
