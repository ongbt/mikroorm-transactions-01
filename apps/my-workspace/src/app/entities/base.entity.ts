import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @Property({ version: true }) // For automatic optimistic locking
  version: number;

  @PrimaryKey()
  id!: number;
}
export abstract class AuditableEntity extends BaseEntity {
  @Property()
  createdBy = 'Admin'; // TODO: to add logged in user

  @Property()
  createdAt = new Date();

  @Property()
  updatedBy = 'Admin'; // TODO: to add logged in user

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
