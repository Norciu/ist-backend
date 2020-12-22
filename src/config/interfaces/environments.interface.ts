import {Dialect} from "sequelize";

export interface Environments {
  production: boolean;
  istPg: {
    username: string;
    host: string;
    port: number;
    database: string;
    password: string;
    dialect: Dialect
  };
  secrets: {
    cookie: string,
    jwt: string,
  }
}
