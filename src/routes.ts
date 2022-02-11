import { Request, Response, Router } from 'express';

import logger from '@middlewares/loggerMiddleware';
import errorHandlingMiddleware from '@middlewares/errorHandlingMiddleware';

import UsersRoutes from '@apps/Users/UsersRoutes';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  logger.info(`Received request`);
  res.send({ message: 'OK!' });
});

router.use(errorHandlingMiddleware);
router.use('/auth', UsersRoutes);

export default router;
