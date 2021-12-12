import { io } from '@http/app';
import { User } from '@prisma/client';
import { ConnectionSocketRepository } from '../repositories/ConnectionSocketRepository';

export function connectionUserSocket() {
  const connectionSocketRepository = new ConnectionSocketRepository();
  
  io.on('connection', (socket) => {
    socket.on('connect_user', async (data: User) => {
      const findUserConnection = await connectionSocketRepository.findByUserId(data.id);

      const connectionData = {
        connected: true,
        socket_id: socket.id,
        user_id: data.id,
      };

      console.log(`Usuário ${data.id} conectado do socket: ${socket.id}`);
      
      if(!findUserConnection) {
        const connection = await connectionSocketRepository.create(connectionData);

        return connection;
      } else {
        const connection = await connectionSocketRepository.save(connectionData);

        return connection;
      }
    });

    socket.on('disconnect', async () => {
      const findUserConnection = await connectionSocketRepository.findBySocketId(socket.id);
      
      if(findUserConnection) {
        console.log(`Usuário ${findUserConnection.user_id} desconectado do socket: ${socket.id}`);

        const connection = await connectionSocketRepository.save({
          connected: false,
          socket_id: socket.id,
          user_id: findUserConnection.user_id,
        });

        return connection;
      }
    });
  });
}