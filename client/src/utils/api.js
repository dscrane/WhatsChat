import axios from 'axios';



export default axios.create({
  baseURL: 'https://dsc-chat-app.herokuapp.com',
})