import { Server } from 'socket.io';

function createServer(httpServer, options) {
  const server = new Server(httpServer, options);

  server.on('connect', (socket) => {
    console.log(`connecting socket ${socket.id}`);

    socket.emit('new user', { greeting: `Hello socket ${socket.id}!` });

    socket.on('disconnect', () => {
      console.log(`disconnecting socket ${socket.id}`);
    });
  });

  return server;
}

export { createServer };
