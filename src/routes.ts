import { Request, Response, Router } from 'express';

import UsersRoutes from '@/apps/Users/UsersRoutes';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.send({ message: 'OK!' });
});

router.use('/auth', UsersRoutes);

export default router;
