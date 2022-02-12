import { postgresConnection, server } from './src/config';
import User from './src/apps/Users/UserEntity';

export default {
  type: 'postgres',
  url: postgresConnection.url,
  migrationsTableName: 'migrations',
  entities: [User],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  ssl:
    server.env === 'production'
      ? { rejectUnauthorized: false }
      : false,
};
