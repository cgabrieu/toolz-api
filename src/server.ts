import connection from '@config/database';
import { server } from '@config/index';

import logger from '@middlewares/loggerMiddleware';

connection.then(() => {
  logger.info(`Database connected`);

  require('./app').default.app.listen(server.port, () => {
    logger.info('Server running', { port: server.port, mode: server.env });
  });
});
