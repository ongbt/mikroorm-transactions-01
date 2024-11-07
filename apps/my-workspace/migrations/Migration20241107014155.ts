import { Migration } from '@mikro-orm/migrations';

export class Migration20241107014155 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "order" drop constraint order_check;`);

    this.addSql(`alter table "order" add constraint order_check check(amount >= 0);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "order" drop constraint order_check;`);

    this.addSql(`alter table "order" add constraint order_check check(amount > 0);`);
  }

}
