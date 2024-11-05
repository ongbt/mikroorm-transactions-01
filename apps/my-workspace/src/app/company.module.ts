import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Order } from './entities/order.entity';
import { Payment } from './entities/payment.entity';
import { User } from './entities/user.entity';
import { OrderController } from './order/order.controller';
import { OrderRepository } from './order/order.repository';
import { OrderService } from './order/order.service';
import { PaymentRepository } from './payment/payment.repository';
import { PaymentService } from './payment/payment.service';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';

export const ENTITY_REGISTRY = [User, Order, Payment];

@Module({
  imports: [MikroOrmModule.forFeature(ENTITY_REGISTRY)],
  controllers: [UserController, OrderController],
  providers: [
    UserService,
    UserRepository,
    OrderService,
    OrderRepository,
    PaymentService,
    PaymentRepository,
  ],
})
export class CompanyModule {}
