import { socket } from '../../../socket';

export const sendMessage = (message) => {
  console.log(`[MESSAGE]: ${message.message} ==> [CHAT]:`);
}