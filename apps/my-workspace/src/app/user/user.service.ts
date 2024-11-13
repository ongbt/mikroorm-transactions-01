import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: UserRepository
  ) {}

  async createUser(name: string, email: string): Promise<User> {
    const user = this.userRepository.create({ name, email });
    await this.em.persistAndFlush(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /**
   *
   */
  async createUsers(
    name: string,
    email: string,
    name2: string,
    email2: string
  ): Promise<User[]> {
    return await this.em.transactional(async () => {
      // Use the same entity manager instance for both services
      const userA = await this.createUser(name, email); // Point A
      const user = await this.createUser(name2, email2); // Point C
      return [userA, user];
    });
  }
  // Additional methods can be added here for update and delete operations.
}
