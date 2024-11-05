import { Migration } from '@mikro-orm/migrations';

export class Migration20241105063057 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null);`);
  }

}
