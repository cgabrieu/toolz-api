import { getConnectionManager } from 'typeorm';

import { postgresConnection, server } from '@/config';
import User from '@/apps/Users/UserEntity';
import Session from '@/apps/Sessions/SessionEntity';

if (
  server.env === 'production' &&
  postgresConnection.url.indexOf('sslmode=require') === -1
) {
  postgresConnection.url += '?sslmode=require';
}

export default async function connect() {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create({
    name: 'default',
    type: 'postgres',
    url: postgresConnection.url,
    entities: [User, Session],
    ssl: server.env === 'production',
  });
  await connection.connect();
  return connection;
}
