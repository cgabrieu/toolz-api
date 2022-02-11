import { postgresConnection, server } from './src/config';
import Users from './src/apps/Users/UsersEntity';

export default {
  type: 'postgres',
  url: postgresConnection.url,
  migrationsTableName: 'migrations',
  entities: [Users],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  ssl:
    server.env === 'production'
      ? { rejectUnauthorized: false }
      : false,
};
