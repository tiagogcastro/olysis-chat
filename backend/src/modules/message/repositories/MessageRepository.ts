import { Message } from '@prisma/client';
import { prismaClient } from '@prisma/index';
import { v4 as uuid } from 'uuid';

import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';

export class MessageRepository {
  async findById(id: string): Promise<Message | null> {
    const message = await prismaClient.message.findUnique({
      where: {
        id
      },
    });

    return message;
  }

  async findAllBy_sent_receive_user_id(sent_user_id: string, receive_user_id: string): Promise<Message[]> {
    const messages = await prismaClient.message.findMany({
      where: {
        receive_user_id,
        sent_user_id,
      },
      orderBy: {
        created_at: 'desc' 
      },
      include: {
        answered_message: true,
        receive_user: true,
        sent_user: true,
      },
    });

    return messages;
  }
  
  async create({
    message,
    receive_user_id,
    sent_user_id,
    answered_message_id
  }: ICreateMessageDTO): Promise<Message> {
    const message_created = await prismaClient.message.create({
      data: {
        id: uuid(),
        message,
        receive_user_id,
        sent_user_id,
        answered_message_id,
        created_at: new Date(),
      },
      include: {
        sent_user: true,
        receive_user: true,
        answered_message: true,
      }
    });

    return message_created;
  }

  async save(message: Message) {
    const messageUpdated = await prismaClient.message.update({
      where: {
        id: message.id
      },
      data: {
        ...message,
        updated_at: new Date(),
      },
    });

    return messageUpdated;
  }
}