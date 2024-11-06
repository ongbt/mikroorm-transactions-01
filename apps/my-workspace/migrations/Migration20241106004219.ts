import { Migration } from '@mikro-orm/migrations';

export class Migration20241106004219 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "order" add column "version" int not null default 1, add column "created_by" varchar(255) not null default 'Admin', add column "created_at" timestamptz not null, add column "updated_by" varchar(255) not null default 'Admin', add column "updated_at" timestamptz not null;`);

    this.addSql(`alter table "payment" add column "version" int not null default 1, add column "created_by" varchar(255) not null default 'Admin', add column "created_at" timestamptz not null, add column "updated_by" varchar(255) not null default 'Admin', add column "updated_at" timestamptz not null;`);

    this.addSql(`alter table "user" add column "version" int not null default 1, add column "created_by" varchar(255) not null default 'Admin', add column "created_at" timestamptz not null, add column "updated_by" varchar(255) not null default 'Admin', add column "updated_at" timestamptz not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "order" drop column "version", drop column "created_by", drop column "created_at", drop column "updated_by", drop column "updated_at";`);

    this.addSql(`alter table "payment" drop column "version", drop column "created_by", drop column "created_at", drop column "updated_by", drop column "updated_at";`);

    this.addSql(`alter table "user" drop column "version", drop column "created_by", drop column "created_at", drop column "updated_by", drop column "updated_at";`);
  }

}
