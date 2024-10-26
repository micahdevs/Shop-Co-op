import { MyContext } from "../types";
import {
	Arg,
	Mutation,
	Resolver,
	Ctx,
	ObjectType,
	Field,
	InputType,
	Query,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/User";

@InputType()
class UsernamePasswordInput {
	@Field()
	username: string;
	@Field()
	password: string;
}

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req, em }: MyContext) {
		// not logged in
		if (!req.session.userId) {
			return null;
		}
		const user = await em.findOne(User, { _id: req.session.userId });
		return user;
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse> {
		if (options.username.length <= 2) {
			return {
				errors: [
					{
						field: "username",
						message: "username must be at least 3 characters",
					},
				],
			};
		}

		if (options.password.length <= 2) {
			return {
				errors: [
					{
						field: "password",
						message: "password must be at least 3 characters",
					},
				],
			};
		}

		const hashedPassword = await argon2.hash(options.password);
		const user = em.create(User, {
			username: options.username,
			password: hashedPassword,
		});

		try {
			await em.persistAndFlush(user);
		} catch (err: any) {
			// || err.detail.includes("already exists")) {
			// duplicate username error
			if (err.code === "23505") {
				return {
					errors: [
						{
							field: "username",
							message: "username already taken",
						},
					],
				};
			}
			console.log("message: ", err.message);
		}

		// store user id session, set cookie on user and keeps them logged in
		req.session.userId = user._id;

		return { user };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse> {
		const user = await em.findOne(User, { username: options.username });
		if (!user) {
			return {
				errors: [
					{
						field: "username",
						message: "username doesn't exist",
					},
				],
			};
		}
		const valid = await argon2.verify(user.password, options.password);
		if (!valid) {
			return {
				errors: [
					{
						field: "password",
						message: "incorrect password",
					},
				],
			};
		}

		req.session.userId = user._id;
		return { user };
	}
}
