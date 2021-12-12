import { User } from '@prisma/client';
import { prismaClient } from '@prisma/index';
import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        email
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        username
      },
    });

    return user;
  }

  async findAll() {
    const all = await prismaClient.user.findMany();

    return all;
  }

  async findAllExcept(user_id: string) {
    const all = await prismaClient.user.findMany({
      where: {
        NOT: {id: user_id}
      },
    });

    return all;
  }

  async create({
    email,
    password,
    username,
    name
  }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        id: uuid(),
        email,
        name,
        password,
        username,
        created_at: new Date(),
      }
    });

    return user;
  }

  async save(user: User) {
    const userUpdated = await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        ...user,
        updated_at: new Date(),
      },
    });

    return userUpdated;
  }
}