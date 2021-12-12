import { AppError } from '@errors/AppError';
import { io } from '@http/app';
import { UserRepository } from '@modules/user/repositories/UserRepository';
import { Message } from '@prisma/client';

import { MessageRepository } from '../repositories/MessageRepository';

interface IRequest {
  receive_user_id: string;
  user_logged_id: string;
}

export class UserMessagesWithReceiveUserService {
  private messageRepository = new MessageRepository();
  private userRepository = new UserRepository();
  async execute({
    receive_user_id,
    user_logged_id
  }: IRequest): Promise<Message[]> {
    const userReceive = await this.userRepository.findById(receive_user_id);
    
    if(!userReceive) {
      throw new AppError('Receiver user not exist');
    }

    const messages = await this.messageRepository.findAllBy_sent_receive_user_id(user_logged_id, receive_user_id);

    io.emit('user_messages_with_receive_user', messages);

    return messages;
  }
}