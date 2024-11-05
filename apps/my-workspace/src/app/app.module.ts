import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../../mikro-orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
