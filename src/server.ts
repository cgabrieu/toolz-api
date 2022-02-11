import app, { init } from '@/app';
import { server } from '@/config';

init().then(() => {
  app.listen(server.port, () => {
    /* eslint-disable-next-line no-console */
    console.info('Server running', { port: server.port, mode: server.env });
  });
});
