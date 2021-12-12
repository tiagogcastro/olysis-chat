import { Request, Response } from 'express';

import { RegisterUserService } from '../services';

export class RegisterUserController {
  async execute(request: Request, response: Response) {
    const {name, email, password, username} = request.body;

    const service = new RegisterUserService();

    const user = await service.execute({
      name, 
      email, 
      password, 
      username
    });

    return response.json(user);
  }
}