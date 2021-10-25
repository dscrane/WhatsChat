import api from "../../config/api";
import history from "../../config/history";
import {
  CHECK_AUTH,
  LOG_IN,
  LOG_OUT,
  UPDATE_USER,
  SET_CHATROOM,
  SET_SOCKET,
  ADD_CHATROOM,
} from "../types";

// Authorize a user
export const checkAuth = () => async (dispatch) => {
  const token = localStorage.getItem("jwt-token");
  if (!token) {
    return dispatch({
      type: "CHECK_AUTH",
      payload: {
        isLoggedIn: false,
        token: null,
      },
    });
  }

  const response = await api.get("/user-id", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({
    type: CHECK_AUTH,
    payload: {
      _id: response.data._id,
      token,
      isLoggedIn: true,
      data: response.data,
    },
  });
  history.push(`/chats/5f52268b6d59e14df8174254`);
};

// Log a user in
export const login = (formValues) => async (dispatch) => {
  const defaultURL = "5f52268b6d59e14df8174254";
  const response = await api.post("/login-user", { ...formValues });

  if (response.data.error) {
    const error = response.data.error;
    alert(`${error.message}`);
    return;
  }

  localStorage.setItem("jwt-token", response.data.token);

  dispatch({
    type: LOG_IN,
    payload: {
      _id: response.data.user._id,
      token: response.data.token,
      isLoggedIn: true,
      data: response.data.user,
    },
  });

  history.push(`/chats/${defaultURL}`);
};

// Log a user out
export const logout = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  await api.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  await localStorage.removeItem("jwt-token");

  dispatch({
    type: LOG_OUT,
  });

  history.push("/");
};

// Sign up a new user
export const signup = (formValues) => async (dispatch) => {
  const defaultURL = "5f52268b6d59e14df8174254";
  const response = await api.post("/create-user", { ...formValues });
  log.emit(response);
  if (response.data.error) {
    const error = response.data.error;
    if (error.code === 11000) {
      alert(
        `The username "${error.keyValue.username}" has already been taken.`
      );
    }
    return;
  }

  localStorage.setItem("jwt-token", response.data.token);

  dispatch({
    type: CHECK_AUTH,
    payload: {
      _id: response.data.user._id,
      token: response.data.token,
      isLoggedIn: true,
      data: response.data.user,
    },
  });

  history.push(`/chats/${defaultURL}`);
};

// Update a user account
export const updateUser = (formValues) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const response = await api.patch(
    "./user-update",
    { ...formValues },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data.error) {
    const error = response.data.error;
    if (error.code === 11000) {
      alert(
        `The username "${error.keyValue.username}" has already been taken.`
      );
    }
    return;
  }

  await dispatch({
    type: UPDATE_USER,
    payload: response.data,
  });
};

// Delete a user account
export const deleteUser = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  const response = await api.post(
    "/user-delete",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data.userDeleted) {
    await localStorage.removeItem("jwt-token");
    await dispatch({
      type: LOG_OUT,
    });
    history.push("/");
  }
};

// Set the current chatroom
export const setChatroom = (currentChatroom) => async (dispatch, getState) => {
  const { chatrooms } = getState();
  dispatch({
    type: SET_CHATROOM,
    payload: { currentChatroom },
  });
  log.emit(chatrooms[currentChatroom]._id);
  history.push(`/chats/${chatrooms[currentChatroom]._id}`);
};

// Set the socket instance
export const setSocket = (socket) => (dispatch) => {
  dispatch({
    type: SET_SOCKET,
    payload: socket,
  });
};
