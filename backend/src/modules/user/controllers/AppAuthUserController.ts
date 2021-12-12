import { Request, Response } from 'express';

import { AppAuthUserService } from '../services';

export class AppAuthUserController {
  async execute(request: Request, response: Response) {
    const { email, password } = request.body;

    const service = new AppAuthUserService();

    const auth = await service.execute({
      email,
      password
    });

    return response.json(auth);
  }
}