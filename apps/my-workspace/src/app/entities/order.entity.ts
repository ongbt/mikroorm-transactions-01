import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Order {
  @PrimaryKey()
  id!: number;

  @Property()
  productId!: string;

  @Property({ columnType: 'numeric(8,2)' })
  amount!: number;
}
