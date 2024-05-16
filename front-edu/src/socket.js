import { io } from 'socket.io-client';
import { URL_BASE } from './constants';

export const socket = io(URL_BASE);