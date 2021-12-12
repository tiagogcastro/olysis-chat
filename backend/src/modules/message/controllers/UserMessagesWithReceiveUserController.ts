import { Request, Response } from 'express';

import {
  UserMessagesWithReceiveUserService
} from '../services';

export class UserMessagesWithReceiveUserController {
  async execute(request: Request, response: Response) {
    const { receive_user_id } = request.params;
    const user_logged_id = request.user.id;

    const service = new UserMessagesWithReceiveUserService();

    const messages = await service.execute({
      user_logged_id,
      receive_user_id,
    });
    
    return response.json(messages);
  }
}