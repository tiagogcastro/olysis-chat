import { Request, Response } from 'express';

import { GetUserLoggedService } from '../services';

export class GetUserLoggedController {
  async execute(request: Request, response: Response) {
    const user_id = request.user.id;

    const service = new GetUserLoggedService();

    const user = await service.execute({user_id});

    return response.json(user);
  }
}