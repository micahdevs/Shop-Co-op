import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class List {
  @Field()
  @PrimaryKey()
  _id!: number;

  @Field(() => String)
  @Property()
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({type: 'text'})
  title!: string;
}