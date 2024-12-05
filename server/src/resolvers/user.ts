import { MyContext } from "../types";
import {
	Arg,
	Mutation,
	Resolver,
	Ctx,
	ObjectType,
	Field,
	Query,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/User";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { appDataSource } from "../utils/dataSourceTypeORM";

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
	@Mutation(() => UserResponse)
	async changePassword(
		@Arg("token") token: string,
		@Arg("newPassword") newPassword: string,
		@Ctx() { redis, req }: MyContext
	): Promise<UserResponse> {
		if (newPassword.length <= 2) {
			return {
				errors: [
					{
						field: "newPassword",
						message: "password must be at least 3 characters",
					},
				],
			};
		}

		const key = FORGET_PASSWORD_PREFIX + token;
		const userId = await redis.get(key);
		if (!userId) {
			return {
				errors: [
					{
						field: "token",
						message: "token expired",
					},
				],
			};
		}

		const userIdNum = parseInt(userId);
		const user = await User.findOneBy({ _id: userIdNum }); // questionable line is _id correct?

		if (!user) {
			return {
				errors: [
					{
						field: "token",
						message: "user no longer exists",
					},
				],
			};
		}

		await User.update(
			{ _id: userIdNum },
			{
				password: await argon2.hash(newPassword),
			}
		);
		await redis.del(key);

		// log in user after changing password
		req.session.userId = user._id;

		return { user };
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg("email") email: string,
		@Ctx() { redis }: MyContext
	) {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			// email not in database
			return true;
		}

		const token = v4();

		await redis.set(
			FORGET_PASSWORD_PREFIX + token,
			user._id,
			"EX",
			1000 * 60 * 60 * 24 * 3 // 3 days
		);

		await sendEmail(
			email,
			`<a href="http://localhost:3000/change-password/${token}">reset password</a>`
		);
		return true;
	}

	@Query(() => User, { nullable: true })
	me(@Ctx() { req }: MyContext) {
		// not logged in
		if (!req.session.userId) {
			return null;
		}
		return User.findOneBy({ _id: req.session.userId }); // questionable line is _id correct?
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const errors = validateRegister(options);
		if (errors) {
			return { errors };
		}
		const hashedPassword = await argon2.hash(options.password);
		let user;

		try {
			const result = await appDataSource
				.createQueryBuilder()
				.insert()
				.into(User)
				.values({
					username: options.username,
					email: options.email,
					password: hashedPassword,
				})
				.returning("*")
				.execute();
			console.log("result: ", result);
			user = result.raw;
		} catch (err: any) {
			console.log("error: ", err);
			// || err.detail.includes("already exists")) {
			// duplicate username error
			// POTENTIALLY NEED TO USE MIKROORM/POSTGRES EM QUERY BUILDER IF GETTING USER ERRORS/ISSUES
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
		@Arg("usernameOrEmail") usernameOrEmail: string,
		@Arg("password") password: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne(
			usernameOrEmail.includes("@") // ADD MORE THOROUGH EMAIL VALIDATION
				? { where: { email: usernameOrEmail } }
				: { where: { username: usernameOrEmail } }
		);
		if (!user) {
			return {
				errors: [
					{
						field: "usernameOrEmail",
						message: "username doesn't exist",
					},
				],
			};
		}
		const valid = await argon2.verify(user.password, password);
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

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) =>
			req.session.destroy((err) => {
				res.clearCookie(COOKIE_NAME);
				if (err) {
					console.log(err);
					resolve(false);
					return;
				} else {
					resolve(true);
				}
			})
		);
	}
}
