import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { TransactionService } from '../order/transaction.service';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly transactionService: TransactionService
  ) {}

  @Post('transactions')
  async createTransaction(
    @Body()
    body: {
      name: string;
      email: string;
      productId: string;
      amount: number;
    }
  ): Promise<User> {
    return this.transactionService.createUserWithOrderAndPayment(
      body.name,
      body.email,
      body.productId,
      body.amount
    );
  }
  @Post()
  async create(@Body() body: { name: string; email: string }): Promise<User> {
    return this.userService.createUser(body.name, body.email);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
