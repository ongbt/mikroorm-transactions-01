import { Check, Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base.entity';

@Entity()
@Check({ expression: 'amount > 0' })
export class Payment extends AuditableEntity {
  @Property({ columnType: 'numeric(8,2)' })
  amount!: number;
}
