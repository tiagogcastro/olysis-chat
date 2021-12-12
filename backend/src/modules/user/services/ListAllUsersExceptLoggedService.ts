import { User } from '@prisma/client';

import { UserRepository } from '../repositories/UserRepository';

interface IRequest {
  user_id: string;
}

export class ListAllUsersExceptLoggedService {
  private userRepository = new UserRepository();
  async execute({
    user_id
  }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllExcept(user_id);

    return users;
  }
}