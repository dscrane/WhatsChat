import io from 'socket.io-client';
const url = process.env.NODE_ENV !== 'development' ? 'https://dsc-chat-app.herokuapp.com' : 'http://localhost:5500'
export const socket = io(url);