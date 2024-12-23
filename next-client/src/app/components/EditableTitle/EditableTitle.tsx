import React, { InputHTMLAttributes, useState } from "react";
import { Title, TextInput } from "@mantine/core";

type EditableTitleProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
}

export const EditableTitle: React.FC<EditableTitleProps> = () => {
	const [title, setTitle] = useState("List");
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleBlur = () => {
		setIsEditing(false);
	};

	return (
		<div>
			{isEditing ? (
				<TextInput
					value={title}
					onChange={handleInputChange}
					onBlur={handleBlur}
					autoFocus
				/>
			) : (
				<Title onClick={handleEditClick}>{title}</Title>
			)}
		</div>
	);
};
