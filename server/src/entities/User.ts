import { ObjectType, Field } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	_id!: number;

	@Field(() => String) // { nullable: true } makes it optional, plus "?" at end of field name for MikroOrm...
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field()
	@Column({ unique: true })
	username!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	// remove field decorator to keep hidden from graphql
	@Column()
	password!: string;
}
