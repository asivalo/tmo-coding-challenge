/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';

import { stocksPlugin, stocksApi } from '../src/app/stocksplugin';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  server.method('stocksApi', stocksApi, {
    cache: {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
      generateTimeout: 2000
    },
    generateKey: (symbol, period) => symbol + ':' + period
  });

  await server.register({
    plugin: stocksPlugin
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
