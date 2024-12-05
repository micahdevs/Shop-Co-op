import { List } from "../entities/List";
import { Query, Resolver, Arg, Mutation } from "type-graphql";

@Resolver()
export class ListResolver {
	@Query(() => [List])
	async lists(): Promise<List[]> {
		return List.find();
	}

	@Query(() => List, { nullable: true })
	list(@Arg("id") _id: number): Promise<List | null> {
		return List.findOneBy({ _id: _id }); //findOne(id) signature dropped..use findOneBy for more type-safe querying
	}

	@Mutation(() => List)
	async createList(@Arg("title") title: string): Promise<List> {
		// two sql queries
		return List.create({ title }).save();
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
