import { Migration } from '@mikro-orm/migrations';

export class Migration20241106015754 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint user_check;`);

    this.addSql(`alter table "user" add constraint user_check check(char_length(email) > 0 and char_length(email) < 20);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint user_check;`);

    this.addSql(`alter table "user" add constraint user_check check(char_length(email) > 0);`);
  }

}
