import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { PaymentService } from '../payment/payment.service';
import { UserService } from '../user/user.service';
import { OrderService } from './order.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly em: EntityManager,
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService
  ) {}

  // Additional methods can be added here for update and delete operations.

  async createOrderWithPayment(
    productId: string,
    amount: number
  ): Promise<Order> {
    await this.orderService.createOrder(productId + 'a', amount + 10000);
    await this.orderService.updateOrder(2, productId + 'b', amount + 10000);
    return await this.em.transactional(async () => {
      // Use the same entity manager instance for both services
      const order = await this.orderService.createOrder(productId, amount);
      await this.paymentService.createPayment(amount);
      return order;
    });
    this.em.flush();
  }
  async createUserWithOrderAndPayment(
    name: string,
    email: string,
    productId: string,
    amount: number
  ): Promise<User> {
    return await this.em.transactional(async () => {
      // Use the same entity manager instance for both services
      const user = await this.userService.createUser(name, email);
      await this.createOrderWithPayment(productId, amount);

      return user;
    });
  }
}
