import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';

@Injectable()
export class NotificationService {
  @OnEvent('user.created')
  handleUserCreatedEvent(event: UserCreatedEvent) {
    // Logic to handle the event (e.g., send a welcome email)
    console.log(`Sending welcome email to ${event.email}`);
  }
}
