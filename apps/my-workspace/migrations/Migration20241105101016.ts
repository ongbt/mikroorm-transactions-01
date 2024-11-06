import { Migration } from '@mikro-orm/migrations';

export class Migration20241105101016 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "order" add constraint order_check check(amount > 0);`);

    this.addSql(`alter table "payment" add constraint payment_check check(amount > 0);`);

    this.addSql(`alter table "user" add constraint user_check check(char_length(email) > 0);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "order" drop constraint order_check;`);

    this.addSql(`alter table "payment" drop constraint payment_check;`);

    this.addSql(`alter table "user" drop constraint user_check;`);
  }

}
