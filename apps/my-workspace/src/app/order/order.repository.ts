import { EntityRepository } from '@mikro-orm/core';
import { Order } from '../entities/order.entity';

export class OrderRepository extends EntityRepository<Order> {}
