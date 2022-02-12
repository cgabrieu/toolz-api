import { BaseEntity, EntityTarget, getConnection } from 'typeorm';
import Users from '../../src/apps/Users/UsersEntity';

export async function clearTable(entity: EntityTarget<BaseEntity>) {
  return getConnection()
    .createQueryBuilder()
    .delete()
    .from(entity)
    .where('id >= :id', { id: 1 })
    .execute();
}

export async function clearDatabase() {
  await clearTable(Users);
}
