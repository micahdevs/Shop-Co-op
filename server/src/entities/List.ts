import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class List {

  @PrimaryKey()
  _id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({type: 'text'})
  title!: string;
}