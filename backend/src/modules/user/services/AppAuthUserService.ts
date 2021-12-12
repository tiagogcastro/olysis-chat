import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '@prisma/client';

import { authConfig } from '@config/auth';
import { AppError } from '@errors/AppError';

import { UserRepository } from '../repositories/UserRepository';
import { connectionUserSocket } from '../middlewares/connectionUserSocket';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User
  token: string;
}

export class AppAuthUserService {
  private userRepository = new UserRepository();
  async execute({
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new AppError('E-mail/password incorrect');
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword) {
      throw new AppError('E-mail/password incorrect');
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });
        
    connectionUserSocket();

    return {
      user,
      token,
    }
  }
}