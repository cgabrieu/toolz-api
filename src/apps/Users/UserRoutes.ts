import { Router } from 'express';

import * as controller from './UserController';
import { validateSignInPayload, validateSignUpPayload } from './UserValidator';

const router = Router();

router.post('/sign-up', validateSignUpPayload, controller.createUser);
router.post('/sign-in', validateSignInPayload, controller.getSession);

export default router;
