import { Router } from 'express';

import * as controller from './UsersController';
import { validateCreateUserPayload } from './UsersValidator';

const router = Router();

router.post('/', validateCreateUserPayload, controller.create);

export default router;
