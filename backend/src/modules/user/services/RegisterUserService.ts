import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '@prisma/client';

import { authConfig } from '@config/auth';
import { AppError } from '@errors/AppError';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

import { UserRepository } from '../repositories/UserRepository';

interface IResponse {
  user: User
  token: string;
}

export class RegisterUserService {
  private userRepository = new UserRepository();
  async execute({
    email,
    name,
    username,
    password,
  }: ICreateUserDTO): Promise<IResponse> {
    const findUserByEmail = await this.userRepository.findByEmail(email);
    const findUserByUsername = await this.userRepository.findByUsername(username);

    if(findUserByEmail || findUserByUsername) {
      throw new AppError('E-mail/username exist');
    }

    const hashPassword = await bcrypt.hash(password, 8);

    if(!hashPassword) {
      throw new AppError('Error internal in password');
    }

    const user = await this.userRepository.create({
      email,
      password: hashPassword,
      username,
      name
    });

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return {
      user,
      token,
    }
  }
}