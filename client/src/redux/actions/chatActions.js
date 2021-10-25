import api from "../../config/api";
import history from "../../config/history";
import {
  DISPLAY_CHATROOMS,
  RENDER_NEW_MESSAGE,
  RENDER_MESSAGES,
  ADD_CHATROOM,
  SET_CHATROOM,
} from "../types";
import _ from "lodash";

// Create a new chatroom
export const createChatroom = (chatroom) => async (dispatch) => {

  try {
    dispatch({
      type: ADD_CHATROOM,
      payload: { ...chatroom, messages: [] },
    });
    history.push(`/chats/${chatroom._id}`);
  } catch (e) {
    dispatch({
      type: "ERROR",
      error: "Invalid Name",
    });
  }
};

// Display current chatrooms
export const displayChatrooms = (chatrooms) => async (dispatch) => {
  const mappedChatrooms = chatrooms.map((chat) => {
    return { ...chat, messages: [] };
  });
  dispatch({
    type: DISPLAY_CHATROOMS,
    payload: { ...mappedChatrooms },
  });
};

// Close a chatroom
export const closeChatroom = (chatroomName) => (dispatch, getState) => {
  const chatrooms = _.omit(getState().chatrooms, [chatroomName]);
  dispatch({
    type: DISPLAY_CHATROOMS,
    payload: { ...chatrooms },
  });
};

// Render historic messages
export const renderMessages = (chatroomName, messages) => async (dispatch) => {
  await dispatch({
    type: RENDER_MESSAGES,
    payload: { chatroomName, messages },
  });
};

// Render new message
export const renderNewMessage = (chatroomName, message) => async (dispatch) => {
  await dispatch({
    type: RENDER_NEW_MESSAGE,
    payload: { chatroomName, message },
  });
};
