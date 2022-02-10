import { createConnections } from 'typeorm';

import { postgresConnection, server } from '../index';

const connection = createConnections([
  {
    name: 'postgres',
    type: 'postgres',
    url: postgresConnection.url,
    entities: [],
    synchronize: server.env === 'dev',
  },
]);

export default connection;
