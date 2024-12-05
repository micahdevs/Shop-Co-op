import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class List extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	_id!: number;

	@Field(() => String) // { nullable: true } makes it optional, plus "?" at end of field name for MikroOrm... Evaluate switch to TypeORM
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field()
	@Column({ type: "text" })
	title!: string;
}