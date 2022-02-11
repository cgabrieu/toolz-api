import { Router, Request, Response } from 'express';
import { setup, serve } from 'swagger-ui-express';

import SwaggerDocument from '@middlewares/swaggerMiddleware';

class SwaggerRoutes {
  async load(): Promise<Router> {
    const swaggerRoute = Router();
    const document = await SwaggerDocument.load();

    swaggerRoute.use('/docs', serve);
    swaggerRoute.get('/docs', setup(document));
    swaggerRoute.get('/docs.json', (_: Request, res: Response) =>
      res.send(document)
    );

    return swaggerRoute;
  }
}

export default new SwaggerRoutes();
