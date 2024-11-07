import { Migrator } from '@mikro-orm/migrations'; // or `@mikro-orm/migrations-mongodb`
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: MikroOrmModuleOptions = {
  // entities: [User, Order, Payment],
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  autoLoadEntities: true,
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
