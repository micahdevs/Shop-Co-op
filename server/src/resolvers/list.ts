import { MyContext } from "src/types";
import { List } from "../entities/List";
import {
	Query,
	Resolver,
	Arg,
	Mutation,
	InputType,
	Field,
	Ctx,
	UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";

@InputType()
class ListInput {
	@Field()
	title: string;
	@Field()
	text: string;
}

@Resolver()
export class ListResolver {
	@Query(() => [List])
	async lists(): Promise<List[]> {
		return List.find();
	}

	@Query(() => List, { nullable: true })
	list(@Arg("id") _id: number): Promise<List | null> {
		return List.findOneBy({ _id: _id });
	}

	@Mutation(() => List)
	@UseMiddleware(isAuth)
	async createList(
		@Arg("input") input: ListInput,
		@Ctx() { req }: MyContext
	): Promise<List> {
		return List.create({
			...input,
			creatorId: req.session.userId,
		}).save();
	}

	@Mutation(() => List, { nullable: true })
	async updateList(
		@Arg("id") _id: number,
		@Arg("title", () => String, { nullable: true }) title: string
	): Promise<List | null> {
		const list = await List.findOneBy({ _id: _id });
		if (!list) {
			return null;
		}
		if (typeof title !== "undefined") {
			await List.update({ _id }, { title });
		}
		return list;
	}

	@Mutation(() => Boolean)
	async deleteList(@Arg("id") _id: number): Promise<boolean> {
		await List.delete(_id);
		return true;
	}
}
