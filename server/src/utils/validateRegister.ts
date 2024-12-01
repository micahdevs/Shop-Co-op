import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";
// ADD MORE THOROUGH EMAIL VALIDATION
export const validateRegister = (options: UsernamePasswordInput) => {
	if (!options.email.includes("@")) {
		return [
			{
				field: "email",
				message: "invalid email",
			},
		];
	}

	if (options.username.length <= 2) {
		return [
			{
				field: "username",
				message: "username must be at least 3 characters",
			},
		];
	}

	if (options.username.includes("@")) {
		return [
			{
				field: "username",
				message: "username cannot contain '@'",
			},
		];
	}

	if (options.password.length <= 2) {
		return [
			{
				field: "password",
				message: "password must be at least 3 characters",
			},
		];
	}

	return null;
};
