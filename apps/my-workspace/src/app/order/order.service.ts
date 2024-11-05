import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository
  ) {}

  async createOrder(productId: string, amount: number): Promise<Order> {
    const user = this.orderRepository.create({ productId, amount });
    await this.em.persistAndFlush(user);
    return user;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  // Additional methods can be added here for update and delete operations.
}
