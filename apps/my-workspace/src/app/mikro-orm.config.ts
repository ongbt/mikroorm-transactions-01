import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';

const config: MikroOrmModuleOptions = {
  entities: [User],
  dbName: 'postgres',
  user: 'postgres',
  password: 'Abcd1234.',
  debug: true,
  driver: PostgreSqlDriver,
};

export default config;
