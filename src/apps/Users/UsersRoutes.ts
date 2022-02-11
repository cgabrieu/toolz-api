import { Router } from 'express';

import * as controller from './UsersController';
import { validateCreateUserPayload } from './UsersValidator';

const router = Router();

router.post('/sign-up', validateCreateUserPayload, controller.create);

export default router;
