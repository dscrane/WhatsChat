import io from 'socket.io-client';
// const url = process.env.NODE_ENV !== 'development' ? '' : 'http://localhost:5500'
export const socket = io();