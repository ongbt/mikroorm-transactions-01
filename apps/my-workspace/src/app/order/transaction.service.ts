import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { PaymentService } from '../payment/payment.service';
import { OrderService } from './order.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly em: EntityManager,
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService
  ) {}

  // Additional methods can be added here for update and delete operations.

  async createOrderWithPayment(
    productId: string,
    amount: number
  ): Promise<Order> {
    return await this.em.transactional(async () => {
      // Use the same entity manager instance for both services
      const order = await this.orderService.createOrder(productId, amount);
      await this.paymentService.createPayment(amount);
      return order;
    });
  }
}
