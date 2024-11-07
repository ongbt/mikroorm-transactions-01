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
    const order = this.orderRepository.create({ productId, amount });
    await this.em.persistAndFlush(order);
    return order;
  }
  async updateOrder(
    id: number,
    productId: string,
    amount: number
  ): Promise<Order> {
    return await this.em.transactional(async (inner) => {
      const order = await this.orderRepository.findOneOrFail(id);
      order.productId = productId;
      order.amount = amount;

      console.log('Start waiting');
      await this.sleep(1000); // Sleep for 3 seconds
      console.log('End');

      await inner.flush();
      return order;
    });
  }
  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneOrFail(id);
  }

  async updateOrder_withWait(
    id: number,
    productId: string,
    amount: number
  ): Promise<Order> {
    const order = await this.orderRepository.findOneOrFail(id);
    order.productId = productId;
    order.amount = amount;
    console.log('Start waiting');
    await this.sleep(1000); // Sleep for 3 seconds
    console.log('End');
    await this.em.flush();
    return order;
  }
  sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  // Additional methods can be added here for update and delete operations.
}
