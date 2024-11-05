import { EntityRepository } from '@mikro-orm/core';
import { Payment } from '../entities/payment.entity';

export class PaymentRepository extends EntityRepository<Payment> {}
