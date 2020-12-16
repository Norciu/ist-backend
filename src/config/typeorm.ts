import {createConnection, EntityTarget, getConnection} from "typeorm";

export const connection = {
  async create() {
    await createConnection();
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
