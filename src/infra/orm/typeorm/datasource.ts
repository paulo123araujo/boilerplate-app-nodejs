import { DataSource } from 'typeorm';
import { env } from '@/env';

type Config = {
  [K in typeof env.NODE_ENV]: () => DataSource;
};

const defaultConfig = {
  migrationsRun: true,
  entities: [],
  migrations: [],
};

const config: Config = {
  dev: () =>
    new DataSource({
      ...defaultConfig,
      type: env.DATABASE_TYPE as 'postgres',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT as 5432,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
    }),
  test: () =>
    new DataSource({
      ...defaultConfig,
      migrationsRun: true,
      type: 'sqlite',
      database: './src/infra/orm/typeorm/test.sqlite',
      logging: false,
      migrations: env.CI
        ? ['./src/infra/orm/typeorm/test-migrations/*.ts']
        : [],
    }),
  prod: () =>
    new DataSource({
      ...defaultConfig,
      type: env.DATABASE_TYPE as 'postgres',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT as 5432,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      ssl: true,
      extra: { ssl: { rejectUnauthorized: false } },
    }),
};

export const dataSource = config[env.NODE_ENV]();
