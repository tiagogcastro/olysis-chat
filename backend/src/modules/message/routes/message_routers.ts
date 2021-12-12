import { Router } from 'express';

import { ensureAuthenticated } from '@modules/user/middlewares/ensureAuthenticated';

import { 
  CreateMessageController, 
} from '../controllers';

export const message = Router();

const createMessageController = new CreateMessageController();

message.post('/create', ensureAuthenticated, createMessageController.execute);