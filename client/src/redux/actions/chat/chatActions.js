import api from '../../../api'
import {socket} from "../../../socket";

export const createChatRoom = name => async dispatch => {
    try {
        const { data } = await api.post(
            '/create-chatRoom',
            { name }
        )

        return dispatch({
            type: 'DISPLAY_CHATROOMS',
            payload: data.chats
        })

    } catch (e) {
        dispatch({
            type: 'ERROR',
            error: 'Invalid Name'
        })
    }
}

export const displayChatRooms = () => async dispatch => {
    try {
        const { data } = await api.get('/chats');
        console.log(data)
        dispatch({
            type: 'DISPLAY_CHATROOMS',
            payload: data.chats
        })
    } catch(e) {
        console.log(e)
    }
}

export const joinChat = chatId => async dispatch => {
    socket.on('connection', s => {
       s.emit('join', chatId)
   })
}


export const fetchMessages = (chatId) => async dispatch => {
    console.log('socket', socket)
    const { data } = await api.get(`/messages/${chatId}`);
    console.log('fetch messages', data)
    dispatch({ type: 'LOAD_MESSAGES', payload: { chatId: data.chatId, messages: data.messages }})
}

const dispatchMessage = data => dispatch => {
    return dispatch({type: 'NEW_MESSAGE', payload: data})
}

export const sendMessage = ({ message, chatId, userId }) => async dispatch => {
    console.log(`[MESSAGE]: ${message} ==> [CHAT]: ${chatId} ==> [FROM]: ${userId}`);
    socket.emit('message', { message, chatId, userId })

    socket.on('return-message', message => {
        console.log(message)
        dispatch({ type: 'NEW_MESSAGE', payload: message })
    })
}

