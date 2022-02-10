import { Request, Response, Router } from 'express';

import logger from '@middlewares/loggerMiddleware';

const router = Router();

router.get('/health', (_: Request, res: Response) => {
  logger.info(`Received request`);
  res.send({ message: 'OK!' });
});

export default router;
