import { Request, Response, Router } from 'express';

import UserRoutes from '@/apps/Users/UserRoutes';
import ToolRoutes from '@/apps/Tools/ToolRoutes';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.send({ message: 'OK!' });
});

router.use('/auth', UserRoutes);
router.use('/tools', ToolRoutes);

export default router;
