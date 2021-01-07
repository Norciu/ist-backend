import {createConnection, EntityTarget, getConnection} from "typeorm";
import {ormconfig} from "./ormconfig";

export const connection = {
  async create() {
    await createConnection(ormconfig);
  },
  async close() {
    await getConnection().close();
  },
  async sync(entity: EntityTarget<unknown>): Promise<void> {
    await getConnection().getRepository(entity).clear();
  },
  async syncDb(force: boolean): Promise<void> {
    await getConnection().synchronize(force)
  }
}
