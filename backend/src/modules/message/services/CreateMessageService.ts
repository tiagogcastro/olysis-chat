import { AppError } from '@errors/AppError';
import { io } from '@http/app';
import { UserRepository } from '@modules/user/repositories/UserRepository';
import { Message } from '@prisma/client';

import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';

import { MessageRepository } from '../repositories/MessageRepository';

export class CreateMessageService {
  private messageRepository = new MessageRepository();
  private userRepository = new UserRepository();
  async execute({
    message, 
    receive_user_id,
    sent_user_id,
    answered_message_id,
  }: ICreateMessageDTO): Promise<Message> {
    const userReceive = await this.userRepository.findById(receive_user_id);

    if(answered_message_id) {
      const messageAnsweredExist = await this.messageRepository.findById(answered_message_id);

      if(!messageAnsweredExist) {
        throw new AppError('Cannot reply to a message that does not exist.');
      }
    }

    if(!userReceive) {
      throw new AppError('Receiver user not exist');
    }

    const message_created = await this.messageRepository.create({
      message,
      receive_user_id,
      sent_user_id,
      answered_message_id,
    });

    io.emit('new_message', message_created);

    return message_created;
  }
}