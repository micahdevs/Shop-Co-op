import { ObjectType, Field, ID } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class List extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	_id!: number;

	@Field()
	@Column({ type: "text" })
	title!: string;

	@Field()
	@Column()
	creatorId: number;

	@ManyToOne(() => User, (user) => user.lists)
	creator: User;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
