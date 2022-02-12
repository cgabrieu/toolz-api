import app, { init } from '@/app';
import { server } from '@/config';
import loggerMiddleware from './middlewares/loggerMiddleware';

init().then(() => {
  app.listen(server.port, () => {
    loggerMiddleware.info('Server running', { port: server.port, mode: server.env });
  });
});
