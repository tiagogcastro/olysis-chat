import { Router } from 'express';

import { ensureAuthenticated } from '@modules/user/middlewares/ensureAuthenticated';

import { 
  CreateMessageController,
  UserMessagesWithReceiveUserController
} from '../controllers';

export const message = Router();

const createMessageController = new CreateMessageController();
const userMessagesWithReceiveUserController = new UserMessagesWithReceiveUserController();

message.post('/create', ensureAuthenticated, createMessageController.execute);
message.get('/list-all/:receive_user_id', ensureAuthenticated, userMessagesWithReceiveUserController.execute);