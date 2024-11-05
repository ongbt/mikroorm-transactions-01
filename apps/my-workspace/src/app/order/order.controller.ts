import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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
