import { Sequelize, Options } from "sequelize";

import {environments} from "./environments";

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
