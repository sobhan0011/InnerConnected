import { io, type Socket } from 'socket.io-client';
import { expressBlogConfig } from '../../configs/expressBlogConfig';

let socket: Socket;

export function createSocket(token: string): Socket {
  socket = io(`${expressBlogConfig.expressBlogHost}:${expressBlogConfig.expressBlogPort}`, {
    auth: { token },
    autoConnect: false,
  });
  return socket;
}

export function getSocket(): Socket {
  return socket;
}
