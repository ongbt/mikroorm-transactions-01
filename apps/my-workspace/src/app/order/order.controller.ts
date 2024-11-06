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
  @Post('transactions')
  async createTransaction(
    @Body() body: { orderId: number; productId: string; amount: number }
  ): Promise<Order> {
    return this.transactionService.createAndUpdateOrderWithPayment(
      body.orderId,
      body.productId,
      body.amount
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
