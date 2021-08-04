import io from 'socket.io-client';
let socket = process.env.NODE_ENV === "production" ? io() : io('http://localhost:5500');

export { socket };