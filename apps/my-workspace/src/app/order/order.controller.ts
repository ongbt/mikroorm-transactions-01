import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderService } from './order.service';
import { TransactionService } from './transaction.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly transactionService: TransactionService
  ) {}

  async createTransactionWithUpdate_Ignore(
    @Body() body: { orderId: number; productId: string; amount: number }
  ): Promise<Order> {
    return await this.transactionService.createAndUpdateOrderWithPayment(
      body.orderId,
      body.productId,
      body.amount
    );
  }
  @Post('transactions')
  async createTransaction(
    @Body() body: { productId: string; amount: number }
  ): Promise<Order> {
    return await this.transactionService.createOrderWithPayment(
      body.productId,
      body.amount
    );
  }
  @Post('transactions2')
  async createTransaction2(
    @Body()
    body: {
      productId: string;
      amount: number;
      productId2: string;
      amount2: number;
    }
  ): Promise<Order[]> {
    return await this.transactionService.createOrderWithPayments(
      body.productId,
      body.amount,
      body.productId2,
      body.amount2
    );
  }
  @Post()
  async create(
    @Body() body: { productId: string; amount: number }
  ): Promise<Order> {
    return this.orderService.createOrder(body.productId, body.amount);
  }
  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { productId: string; amount: number }
  ): Promise<Order> {
    return this.orderService.updateOrder(id, body.productId, body.amount);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }
}
