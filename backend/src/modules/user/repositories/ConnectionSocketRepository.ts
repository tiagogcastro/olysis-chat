import { prismaClient } from '@prisma/index';
import { v4 as uuid } from 'uuid';

interface ICreateConnectionSocketDTO {
  socket_id: string;
  user_id: string;
  connected: boolean;
}

export class ConnectionSocketRepository {
  async findByUserId(user_id: string) {
    const connection = await prismaClient.connectionSocket.findUnique({
      where: {
        user_id
      }
    });

    return connection;
  }

  async findBySocketId(socket_id: string) {
    const connection = await prismaClient.connectionSocket.findFirst({
      where: {
        socket_id
      }
    });

    return connection;
  }

  async create({
    socket_id,
    user_id,
    connected
  }: ICreateConnectionSocketDTO) {
    const connection = await prismaClient.connectionSocket.create({
      data: {
        id: uuid(),
        socket_id,
        user_id,
        connected
      }
    });

    return connection;
  }

  async save({
    socket_id,
    user_id,
    connected
  }: ICreateConnectionSocketDTO) {
    const connection = await prismaClient.connectionSocket.update({
      where: {
        user_id,
      },
      data: {
        socket_id,
        connected
      }
    });

    return connection;
  }
}