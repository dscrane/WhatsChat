import { socket } from '../../../socket';

export const sendMessage = (message, chatId) => {
  console.log(`[MESSAGE]: ${message.message} ==> [CHAT]: ${chatId}`);
}