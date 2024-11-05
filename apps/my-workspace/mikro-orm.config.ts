import { Migrator } from '@mikro-orm/migrations'; // or `@mikro-orm/migrations-mongodb`
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './src/app/entities/user.entity';

const config: MikroOrmModuleOptions = {
  entities: [User],
  dbName: 'postgres',
  user: 'postgres',
  password: 'Abcd1234.',
  debug: true,
  driver: PostgreSqlDriver,
  extensions: [Migrator],
  migrations: { path: './migrations' },
};

export default config;
