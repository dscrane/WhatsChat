import axios from 'axios';
console.log('PROCESS.ENV', process.env.NODE_ENV)
export default axios.create({
  baseURL: process.env.NODE_ENV === "production" ? 'https://dsc-whatschat.herokuapp.com/' : 'http://localhost:5500',
  headers: {'Content-Security-Policy': "default-src *"}
})