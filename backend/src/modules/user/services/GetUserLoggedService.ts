import { User } from '@prisma/client';

import { UserRepository } from '../repositories/UserRepository';

interface IRequest {
  user_id: string;
}

export class GetUserLoggedService {
  private userRepository = new UserRepository();
  async execute({
    user_id
  }: IRequest): Promise<User | null> {
    const user = await this.userRepository.findById(user_id);

    return user;
  }
}