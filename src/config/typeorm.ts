import { Connection, createConnection, EntityTarget, getConnection } from 'typeorm';
import { ormconfig } from './ormconfig';

export const connection = {
  create(): Promise<Connection> {
    return createConnection(ormconfig);
  },
  close(): Promise<void> {
    return getConnection().close();
  },
  sync(entity: EntityTarget<unknown>): Promise<void> {
    return getConnection().getRepository(entity).clear();
  },
  syncDb(force: boolean): Promise<void> {
    return getConnection().synchronize(force);
  }
};
