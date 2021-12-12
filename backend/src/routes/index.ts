import { Router } from 'express';

import { user } from '@modules/user/routes/user_routers';
import { auth } from '@modules/user/routes/auth_routers';

export const router = Router();

router.use('/users', user);
router.use('/auth', auth);