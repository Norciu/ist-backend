import { ConnectionOptions } from 'typeorm';

export interface Environments {
  production: boolean;
  db: ConnectionOptions
  secrets: {
    cookie: string,
    jwt: string,
  }
}
