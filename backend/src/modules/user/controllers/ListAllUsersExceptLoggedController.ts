import { Request, Response } from 'express';

import { ListAllUsersExceptLoggedService } from '../services';

export class ListAllUsersExceptLoggedController {
  async execute(request: Request, response: Response) {
    const user_id = request.user.id;

    const service = new ListAllUsersExceptLoggedService();

    const users = await service.execute({user_id});

    return response.json(users);
  }
}