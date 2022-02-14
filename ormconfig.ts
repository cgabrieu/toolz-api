import { postgresConnection, server } from './src/config';
import User from './src/apps/Users/UserEntity';
import Session from './src/apps/Sessions/SessionEntity';
import Tool from './src/apps/Tools/ToolEntity';
import Tag from './src/apps/Tags/TagEntity';

export default {
  type: 'postgres',
  url: postgresConnection.url,
  migrationsTableName: 'migrations',
  entities: [User, Session, Tool, Tag],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  ssl:
    server.env === 'production'
      ? { rejectUnauthorized: false }
      : false,
};
