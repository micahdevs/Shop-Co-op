import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User {
	@Field()
	@PrimaryKey()
	_id!: number;

	@Field(() => String, { nullable: true }) // { nullable: true } makes it optional, plus "?" at end of field name
	@Property({ onCreate: () => new Date() })
	createdAt?: Date = new Date();

	@Field(() => String, { nullable: true }) // MikroORM will then automatically handle the createdAt/updatedAt
	@Property({ onUpdate: () => new Date() })
	updatedAt?: Date = new Date();

	@Field()
	@Property({ type: "text", unique: true })
	username!: string;

	@Field()
	@Property({ type: "text", unique: true })
	email!: string;

	// remove field decorator to keep hidden from graphql
	@Property({ type: "text" })
	password!: string;
}
