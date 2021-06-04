import { config } from 'dotenv';
import { options } from 'yargs';
import { existsSync } from 'fs';
import { join, resolve, dirname } from 'path';

const argv = options({ prod: { default: false, type: 'boolean' } }).argv;
const prodEnv = argv.prod ? 'prod' : 'dev';

const envPath: string = existsSync(resolve(join(dirname(__filename), `../../.env.${prodEnv}.local`)))
  ? resolve(join(dirname(__filename), `../../.env.${prodEnv}.local`)) : resolve(join(dirname(__filename), `../../.env.${prodEnv}`));

config({ path: envPath });

const env = process.env;

export default {
  production: argv.prod,
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE
  },
  secrets: {
    jwt: env.JWT_SECRET,
    cookie: env.COOKIE_SECRET
  }
};
