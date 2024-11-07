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
    return await this.em.transactional(async () => {
      // Use the same entity manager instance for both services
      const order = await this.orderService.createOrder(productId, amount);
      await this.paymentService.createPayment(amount);
      if (amount > 99999) {
        await this.em.rollback(); // impt to have 'await', else error 'Transaction query already complete, run with DEBUG=knex:tx'
      }
      return order;
    });
    this.em.flush();
  }

  /**
   * begin
   * [query] insert into "order" ("created_by", "created_at", "updated_by", "updated_at", "product_id", "amount") values ('Admin', '2024-11-06T01:20:42.034Z', 'Admin', '2024-11-06T01:20:42.034Z', 'Product-11a', 10002.5) returning "id", "version" [took 1 ms, 1 row affected]
   * [query] commit
   * [query] select "o0".* from "order" as "o0" where "o0"."id" = 19 limit 1 [took 1 ms, 1 result]
   * [query] begin
   * [query] update "order" set "amount" = 10002.5, "updated_at" = '2024-11-06T01:20:42.042Z', "version" = "version" + 1 where "id" = 19 and "version" = 7 returning "version" [took 1 ms, 1 row affected]
   * [query] commit
   * [query] begin
   * [query] insert into "order" ("created_by", "created_at", "updated_by", "updated_at", "product_id", "amount") values ('Admin', '2024-11-06T01:20:42.046Z', 'Admin', '2024-11-06T01:20:42.046Z', 'Product-11', 2.5) returning "id", "version" [took 1 ms, 1 row affected]
   * [query] insert into "payment" ("created_by", "created_at", "updated_by", "updated_at", "amount") values ('Admin', '2024-11-06T01:20:42.048Z', 'Admin', '2024-11-06T01:20:42.048Z', 2.5) returning "id", "version" [took 1 ms, 1 row affected]
   * [query] commit
   *
   */
  async createAndUpdateOrderWithPayment(
    orderId: number,
    productId: string,
    amount: number
  ): Promise<Order> {
    await this.orderService.createOrder(productId + 'a', amount + 10000);
    await this.orderService.updateOrder(
      orderId,
      productId + 'b',
      amount + 10000
    );
    const order = await this.em.transactional(async (em) => {
      const order = await this.orderService.createOrder(productId, amount);
      await this.paymentService.createPayment(amount);

      return order;
    });
    this.em.flush();
    return order;
  }

  /**
   * Success:
   * [query] begin
   * [query] insert into "user" ("created_by", "created_at", "updated_by", "updated_at", "name", "email") values ('Admin', '2024-11-06T01:34:47.521Z', 'Admin', '2024-11-06T01:34:47.521Z', 'Name-11', 'name11@email.com') returning "id", "version" [took 3 ms, 1 row affected]
   * [query] savepoint trx3
   * [query] insert into "order" ("created_by", "created_at", "updated_by", "updated_at", "product_id", "amount") values ('Admin', '2024-11-06T01:34:47.531Z', 'Admin', '2024-11-06T01:34:47.531Z', 'Product-12', 2149.5) returning "id", "version" [took 2 ms, 1 row affected]
   * [query] insert into "payment" ("created_by", "created_at", "updated_by", "updated_at", "amount") values ('Admin', '2024-11-06T01:34:47.535Z', 'Admin', '2024-11-06T01:34:47.535Z', 2149.5) returning "id", "version" [took 2 ms, 1 row affected]
   * [query] release savepoint trx3
   * [query] insert into "user" ("created_by", "created_at", "updated_by", "updated_at", "name", "email") values ('Admin', '2024-11-06T01:34:47.539Z', 'Admin', '2024-11-06T01:34:47.539Z', 'Name-11a', 'name11@email.coma') returning "id", "version" [took 2 ms, 1 row affected]
   * [query] commit
   *
   * If fail at point A: simulate by inputting > 20 chars for email
   * Result: All points (A, B, C) did not execute complete
   * [query] commit
   * [query] begin
   * [query](FAILED) insert into "user" ("created_by", "created_at", "updated_by", "updated_at", "name", "email") values ('Admin', '2024-11-06T01:36:07.702Z', 'Admin', '2024-11-06T01:36:07.702Z', 'Name-11', '') returning "id", "version" [took 3 ms]
   * [query] rollback
   *
   * If fail at point B: simulate by inputting negative for amount
   * Result: All points (A, B, C) did not execute complete.
   * Explanation: This is due to when B failed to commit, it also throws exception (due to a check constraint), this throw exception cause the outer trx to rollback
   * [query] begin
   * [query] insert into "user" ("created_by", "created_at", "updated_by", "updated_at", "name", "email") values ('Admin', '2024-11-06T01:48:20.304Z', 'Admin', '2024-11-06T01:48:20.304Z', 'Name-11a', 'name11@email.coma') returning "id", "version" [took 3 ms, 1 row affected]
   * [query] savepoint trx7
   * [query](FAILED) insert into "order" ("created_by", "created_at", "updated_by", "updated_at", "product_id", "amount") values ('Admin', '2024-11-06T01:48:20.310Z', 'Admin', '2024-11-06T01:48:20.310Z', 'Product-12', -2149.5) returning "id", "version" [took 2 ms]
   * [query] rollback to savepoint trx7
   * [query] rollback (This rollback is due to the exception thrown by the createOrderWithPayment())
   *
   * If fail at point C: simulate by inputting 0 chars for email
   * [query] begin
   * [query] insert into "user" ("created_by", "created_at", "updated_by", "updated_at", "name", "email") values ('Admin', '2024-11-06T01:41:49.825Z', 'Admin', '2024-11-06T01:41:49.825Z', 'Name-11a', 'a') returning "id", "version" [took 2 ms, 1 row affected]
   * [query] savepoint trx5
   * [query] insert into "order" ("created_by", "created_at", "updated_by", "updated_at", "product_id", "amount") values ('Admin', '2024-11-06T01:41:49.829Z', 'Admin', '2024-11-06T01:41:49.829Z', 'Product-12', 2149.5) returning "id", "version" [took 1 ms, 1 row affected]
   * [query] insert into "payment" ("created_by", "created_at", "updated_by", "updated_at", "amount") values ('Admin', '2024-11-06T01:41:49.831Z', 'Admin', '2024-11-06T01:41:49.831Z', 2149.5) returning "id", "version" [took 1 ms, 1 row affected]
   * [query] release savepoint trx5
   * [query](FAILED) insert into "user" ("created_by", "created_at", "updated_by", "updated_at", "name", "email") values ('Admin', '2024-11-06T01:41:49.835Z', 'Admin', '2024-11-06T01:41:49.835Z', 'Name-11', '') returning "id", "version" [took 2 ms]
   * [query] rollback
   *
   *
   */
  async createUserWithOrderAndPayment(
    name: string,
    email: string,
    productId: string,
    amount: number
  ): Promise<User> {
    return await this.em.transactional(async () => {
      // Use the same entity manager instance for both services
      const userA = await this.userService.createUser(name + 'a', email + 'a'); // Point A
      await this.createOrderWithPayment(productId, amount); // this method has a transaction inside // Point B
      const user = await this.userService.createUser(name, email); // Point C
      return user;
    });
  }

  async createUserWithOrderAndPayment_WithSeparateTrx(
    name: string,
    email: string,
    productId: string,
    amount: number
  ): Promise<User> {
    await this.createOrderWithPayment(productId, amount); // this method has a transaction inside // Point B
    return await this.em.transactional(async () => {
      // Use the same entity manager instance for both services
      const userA = await this.userService.createUser(name + 'a', email + 'a'); // Point A
      const user = await this.userService.createUser(name, email); // Point C
      return user;
    });
  }
}
