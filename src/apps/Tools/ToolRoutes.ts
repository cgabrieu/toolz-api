import { Router } from 'express';

import * as controller from './ToolController';
import { validateCreateToolPayload } from './ToolValidator';

const router = Router();

router.post('/', validateCreateToolPayload, controller.createTool);

export default router;
