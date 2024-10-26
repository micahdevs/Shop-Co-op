"use client";
import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Group,
	Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "urql";
import { REGISTER_MUT } from "@/graphql/mutations/register";
import { RegisterMutation, UsernamePasswordInput } from "@/generated/graphql";

export const LoginForm: React.FC = () => {
	const form = useForm<UsernamePasswordInput>({
		mode: "uncontrolled",
		initialValues: {
			username: "",
			password: "",
		},

		validate: {
			username: (value) =>
				value.length < 6 ? "Username must be 6 characters or longer" : null,
			password: (value) =>
				value.length < 6 ? "Password must be 6 characters or longer" : null,
		},
	});

	const [, register] = useMutation<RegisterMutation>(REGISTER_MUT);

	const handleSubmit = async (values: UsernamePasswordInput) => {
		try {
			await register({ username: values.username, password: values.password });
			console.log("successfully registered!");
		} catch (error) {
			console.log(console.error(error));
		}
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					label="Username or Email"
					placeholder="Your Username or Email"
					required
					key={form.key("username")}
					{...form.getInputProps("username")}
				/>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					required
					mt="md"
					key={form.key("password")}
					{...form.getInputProps("password")}
				/>
				<Group justify="space-between" mt="lg">
					<Checkbox label="Remember me" />
					<Anchor component="button" size="sm">
						Forgot password?
					</Anchor>
				</Group>
				<Button type="submit" fullWidth mt="xl">
					Login
				</Button>
			</Paper>
		</form>
	);
};
