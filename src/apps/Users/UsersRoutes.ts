import { Router } from 'express';

import * as controller from './UsersController';

const router = Router();

router.post('/', controller.create);

export default router;
