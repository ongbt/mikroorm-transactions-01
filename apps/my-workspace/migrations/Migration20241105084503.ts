import { Migration } from '@mikro-orm/migrations';

export class Migration20241105084503 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "order" alter column "amount" type numeric(8,2) using ("amount"::numeric(8,2));`);

    this.addSql(`alter table "payment" alter column "amount" type numeric(8,2) using ("amount"::numeric(8,2));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "order" alter column "amount" type int using ("amount"::int);`);

    this.addSql(`alter table "payment" alter column "amount" type int using ("amount"::int);`);
  }

}
