import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { AppError } from '@errors/AppError';
import { router } from '@routes/index';

const app = express();
const serverHttp = http.createServer(app);

app.use(express.json());

app.use(router);

app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      statusCode: error.statusCode,
    });
  }
  
  console.log(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    statusCode: 500,
  });
})

const io = new Server(serverHttp);

export {
  serverHttp,
  io
}