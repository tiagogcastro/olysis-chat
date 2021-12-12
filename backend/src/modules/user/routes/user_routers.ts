import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { 
  RegisterUserController, 
  GetUserLoggedController,
  ListAllUsersExceptLoggedController
} from '../controllers';

export const user = Router();

const registerUserController = new RegisterUserController();
const getUserLoggedController = new GetUserLoggedController();
const listAllUsersExceptLoggedController = new ListAllUsersExceptLoggedController();

user.post('/register', registerUserController.execute);
user.get('/profile', ensureAuthenticated, getUserLoggedController.execute);
user.get('/list-all/except/user-logged', ensureAuthenticated, listAllUsersExceptLoggedController.execute);