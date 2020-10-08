import axios from 'axios';

export default axios.create({
  baseURL: process.env.NODE_ENV !== 'development' ? 'https://dsc-chat-app.herokuapp.com' : 'http://localhost:5500',
  headers: {'Content-Security-Policy': "default-src 'self'"}
})