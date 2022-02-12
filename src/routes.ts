import { Request, Response, Router } from 'express';

import UserRoutes from '@/apps/Users/UserRoutes';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.send({ message: 'OK!' });
});

router.use('/auth', UserRoutes);

export default router;
