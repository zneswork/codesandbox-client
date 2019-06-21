import {
  addForkHandler,
  addDefaultForkHandler,
  preloadWorker,
  fork,
  execSync,
  execFileSync,
} from './child_process';

import {
  Socket,
  Server,
  WebSocketServer,
  setSocketURL,
  createServer,
  createConnection,
  connect,
} from './net';

export {
  addForkHandler,
  addDefaultForkHandler,
  preloadWorker,
  fork,
  execSync,
  execFileSync,
  Socket,
  Server,
  WebSocketServer,
  setSocketURL,
  createServer,
  createConnection,
  connect,
};

export const child_process = {
  addForkHandler,
  addDefaultForkHandler,
  preloadWorker,
  fork,
  execSync,
  execFileSync,
};

export const net = {
  Socket,
  Server,
  WebSocketServer,
  setSocketURL,
  createServer,
  createConnection,
  connect,
};

export { default as Electron } from './electron';
export { default as Module } from './module';
export { createInterface } from './readline';
