import { Migrator } from '@mikro-orm/migrations'; // or `@mikro-orm/migrations-mongodb`
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Order } from './src/app/entities/order.entity';
import { Payment } from './src/app/entities/payment.entity';
import { User } from './src/app/entities/user.entity';

const config: MikroOrmModuleOptions = {
  entities: [User, Order, Payment],
  // autoLoadEntities: true,
  dbName: 'postgres',
  user: 'postgres',
  password: 'Abcd1234.',
  debug: true,
  driver: PostgreSqlDriver,
  // flushMode: FlushMode.COMMIT,
  extensions: [Migrator],
  migrations: { path: './migrations' },
};

export default config;
