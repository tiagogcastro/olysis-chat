import { Request, Response } from 'express';

import {
  CreateMessageService
} from '../services';

export class CreateMessageController {
  async execute(request: Request, response: Response) {
    const { 
      message, 
      receive_user_id,
      answered_message_id
    } = request.body;
    const user_logged_id = request.user.id;

    const service = new CreateMessageService();

    const message_created = await service.execute({
      message,
      receive_user_id,
      answered_message_id,
      sent_user_id: user_logged_id
    });
    
    return response.json({
      message: message_created
    });
  }
}