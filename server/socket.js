import { Server as SocketServer } from 'socket.io';

export default function createSocketServer(httpServer) {
  const socketServer = new SocketServer(httpServer);

  socketServer.on('connect', (socket) => {
    console.log(`connecting socket ${socket.id}`);

    socket.emit('new user', { greeting: `Hello socket ${socket.id}!` });

    socket.on('disconnect', () => {
      console.log(`disconnecting socket ${socket.id}`);
    });
  });

  return socketServer;
}
