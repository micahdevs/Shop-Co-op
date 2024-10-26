"use client";
import { TextInput, PasswordInput, Paper, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "urql";
import { REGISTER_MUT } from "@/graphql/mutations/register";
import { RegisterMutation, UsernamePasswordInput } from "@/generated/graphql";

export const RegisterForm: React.FC = () => {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			username: "",
			password: "",
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			username: (value) =>
				value.length < 3 ? "Username must be 3 characters or longer" : null,
			password: (value) =>
				value.length < 3 ? "Password must be 3 characters or longer" : null,
		},
	});

	const [, register] = useMutation<RegisterMutation>(REGISTER_MUT);

	const handleSubmit = async (values: UsernamePasswordInput) => {
		try {
			await register({ username: values.username, password: values.password });
			console.log("successfully registered!", values);
		} catch (error) {
			console.log(console.error(error));
		}
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					label="Email"
					placeholder="yourEmail@email.com"
					// required
					key={form.key("email")}
					{...form.getInputProps("email")}
				/>
				<TextInput
					label="Username"
					placeholder="Create a unique username"
					required
					mt="md"
					key={form.key("username")}
					{...form.getInputProps("username")}
				/>
				<PasswordInput
					label="Password"
					placeholder="Consider a strong password"
					required
					mt="md"
					key={form.key("password")}
					{...form.getInputProps("password")}
				/>
				<Button type="submit" fullWidth mt="xl">
					Register
				</Button>
			</Paper>
		</form>
	);
};
