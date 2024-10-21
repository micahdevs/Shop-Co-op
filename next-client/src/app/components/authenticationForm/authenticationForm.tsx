"use client";
import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./authenticationForm.module.css";
import { useMutation } from "urql";

const REGISTER_MUTATION = `mutation Register($username: String!, $password: String!) {
    register(options: {username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        _id
        username
      }
    }
  }`;

export function AuthenticationForm() {
	const form = useForm({
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

    const [, register] = useMutation(REGISTER_MUTATION);

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Welcome back!
			</Title>
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Do not have an account yet?{" "}
				<Anchor size="sm" component="button">
					Create account
				</Anchor>
			</Text>
			<form
				onSubmit={form.onSubmit(
					(values, event) => {
						console.log(
							values, // <- form.getValues() at the moment of submit
							event // <- form element submit event
						);
                        return register(values);
					},
					(validationErrors, values, event) => {
						console.log(
							validationErrors, // <- form.errors at the moment of submit
							values,
							event
						);
					}
				)}
			>
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
					<Button 
                    type="submit" 
                    fullWidth 
                    mt="xl"
                    
                    >
						Register
					</Button>
				</Paper>
			</form>
		</Container>
	);
}
