import { InjectRepository } from '@mikro-orm/nestjs';
import { EnsureRequestContext, EntityManager } from '@mikro-orm/postgresql';
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
    const order = this.orderRepository.create({ productId, amount });
    await this.em.persistAndFlush(order);
    return order;
  }
  @EnsureRequestContext()
  async updateOrder(
    id: number,
    productId: string,
    amount: number
  ): Promise<Order> {
    const order = await this.orderRepository.findOneOrFail(id);
    // console.log('order: ', order);
    order.productId = productId;
    order.amount = amount;
    await this.em.flush();
    return order;
  }
  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneOrFail(id);
  }
  // Additional methods can be added here for update and delete operations.
}
