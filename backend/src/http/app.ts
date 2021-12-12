import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { AppError } from '@errors/AppError';
import { router } from '@routes/index';
import { connectionUserSocket } from '@modules/user/middlewares/connectionUserSocket';

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
});

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.use(router);
connectionUserSocket();

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

export {
  serverHttp,
  io
}