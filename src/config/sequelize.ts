import { Sequelize, Options } from "sequelize";
import yargs from "yargs";
//@ts-ignore
import { hideBin } from "yargs/helpers";

import { config } from "dotenv";
import {environments} from "./";

if (process.argv.includes('--prod')) {
  config();
} else {
  config({ path: __dirname + ".env.dev" });
}

// const argv = yargs(hideBin(process.argv)).argv
const env = process.env;

console.log(env);

const argv = yargs(process.argv.slice(2)).options({
  db_host: { type: "string" },
  db_port: { type: "number" },
  database: { type: "string" },
  username: { type: "string" },
  password: { type: "string" },
  dialect: { choices: ["mysql", "postgres", "sqlite", "mariadb", "mssql"] },
}).argv;

/**
 * Zmienne dla connectora.
 * Pobierane bezpośrednio z dotenv lub opcjonalnie można podać jako argument startowy;
 * @example
 * $: node ./dist/index.js --host 192.168.0.100
 */
const options: Options = environments.istPg;

/**
 * Connector Sequelize ORM dla lokalnej bazy danych postgres
 */
export const istPg = new Sequelize(options);
