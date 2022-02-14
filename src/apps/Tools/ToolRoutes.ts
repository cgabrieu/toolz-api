import { Router } from 'express';

import * as controller from './ToolController';
import { validateCreateToolPayload } from './ToolValidator';
import tokenValidationMiddleware from '@/middlewares/tokenValidationMiddleware';

const router = Router();

router.get('/', controller.getTools);

router.use(tokenValidationMiddleware);
router.post('/', validateCreateToolPayload, controller.createTool);

export default router;
