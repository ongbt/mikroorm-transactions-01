import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../entities/user.entity';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private eventEmitter: EventEmitter2
  ) {}

  async createUser(name: string, email: string): Promise<User> {
    const user = this.userRepository.create({ name, email });
    await this.em.persistAndFlush(user);

    // Logic to create the user
    console.log(`User created: ${user.id}, ${user.email}`);

    // Emit the event after creating the user
    const userCreatedEvent = new UserCreatedEvent(
      user.id,
      user.name,
      user.email
    );

    this.eventEmitter.emit('user.created', userCreatedEvent);
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
