import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../../mikro-orm.config';
import { CompanyModule } from './company.module';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
