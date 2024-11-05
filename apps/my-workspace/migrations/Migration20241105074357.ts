import { Migration } from '@mikro-orm/migrations';

export class Migration20241105074357 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "order" ("id" serial primary key, "product_id" varchar(255) not null, "amount" int not null);`);

    this.addSql(`create table "payment" ("id" serial primary key, "amount" int not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "order" cascade;`);

    this.addSql(`drop table if exists "payment" cascade;`);
  }

}
