import { Router } from 'express';

import { 
  AppAuthUserController,
} from '../controllers';

export const auth = Router();

const appAuthUserController = new AppAuthUserController();

auth.post('/app', appAuthUserController.execute);