import { ConnectionOptions } from 'typeorm';
import { resolve } from 'path';
import env from './environments';

const entitiesPath = resolve(__dirname, '../', 'entity');

export const ormconfig: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: env.db.host,
  port: Number(env.db.port),
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: !env.production,
  logging: !env.production,
  entities: [entitiesPath + '**/*.{js,ts}'],
};
