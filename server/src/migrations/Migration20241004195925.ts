import { Migration } from '@mikro-orm/migrations';

export class Migration20241004195925 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "list" ("_id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" text not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "list" cascade;`);
  }

}
