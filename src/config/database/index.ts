import { createConnections } from 'typeorm';

import Users from '@apps/Users/UsersEntity';

import { postgresConnection, server } from '../index';

const connection = createConnections([
  {
    name: 'postgres',
    type: 'postgres',
    url: postgresConnection.url,
    entities: [Users],
    synchronize: server.env === 'dev',
  },
]);

export default connection;
