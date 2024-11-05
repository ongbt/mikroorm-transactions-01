import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

export const CASE_ENTITY_REGISTRY = [User];

@Module({
  imports: [MikroOrmModule.forFeature(CASE_ENTITY_REGISTRY)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
