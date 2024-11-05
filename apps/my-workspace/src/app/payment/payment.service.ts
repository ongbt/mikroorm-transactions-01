import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Payment } from '../entities/payment.entity';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Payment)
    private readonly paymentRepository: PaymentRepository
  ) {}

  async createPayment(amount: number): Promise<Payment> {
    const user = this.paymentRepository.create({ amount });
    await this.em.persistAndFlush(user);
    return user;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.findAll();
  }

  // Additional methods can be added here for update and delete operations.
}
