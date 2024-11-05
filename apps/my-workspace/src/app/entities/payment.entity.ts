import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Payment {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'numeric(8,2)' })
  amount!: number;
}
