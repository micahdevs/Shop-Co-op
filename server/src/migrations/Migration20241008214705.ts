import { Migration } from '@mikro-orm/migrations';

export class Migration20241008214705 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("_id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "username" text not null, "password" text not null);`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
