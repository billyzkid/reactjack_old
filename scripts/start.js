import startServer from '../server/index.js';

async function start() {
  const dev = process.argv[2] === 'dev';
  await startServer(dev);
}

start();
