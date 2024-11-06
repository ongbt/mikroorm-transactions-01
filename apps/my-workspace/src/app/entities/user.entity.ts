import { Check, Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base.entity';

@Entity()
@Check({ expression: 'char_length(email) > 0' }) // Ensure length is greater than 0
export class User extends AuditableEntity {
  @Property()
  name!: string;

  @Property()
  email!: string;
}
