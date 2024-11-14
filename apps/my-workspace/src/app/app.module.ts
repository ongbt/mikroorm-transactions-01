import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import mikroOrmConfig from '../../mikro-orm.config';
import { CompanyModule } from './company.module';
import { NotificationService } from './notification/notification.service';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    CompanyModule,
    EventEmitterModule.forRoot(), // Initializes the event emitter globally
  ],
  controllers: [],
  providers: [NotificationService],
})
export class AppModule {}
