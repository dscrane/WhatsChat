import api from "../../config/api";
import history from "../../config/history";
import {
  CHECK_AUTH,
  LOG_IN,
  LOG_OUT,
  UPDATE_USER,
  SET_CHATROOM,
  SET_SOCKET,
} from "../types";

/* ----   CHECK_AUTH ACTION CREATOR    ---- */
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
  // history.push(`/MessagesDisplay/5f52268b6d59e14df8174254`);
};
/* ----   ****    ---- */

/* ----   LOG_IN ACTION CREATOR    ---- */
export const login = (formValues) => async (dispatch) => {
  console.log("login ran");
  const defaultChatroom = "Buddies";
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

  history.push(`/chats/${defaultChatroom}`);
};
/* ----   ****    ---- */

/* ----   LOG_OUT ACTION CREATOR    ---- */
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
/* ----   ****    ---- */

/* ----   SIGN_UP ACTION CREATOR    ---- */
export const signup = (formValues) => async (dispatch) => {
  const defaultChatroom = "5f52268b6d59e14df8174254";
  const response = await api.post("/create-user", { ...formValues });
  console.log(response);
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

  history.push(`/chats/${defaultChatroom}`);
};
/* ----   ****    ---- */

/* ----   UPDATE_USER ACTION CREATOR    ---- */
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

  dispatch({
    type: UPDATE_USER,
    payload: response.data.user,
  });
};

/* ----   ****    ---- */

/* ----   DELETE_USER ACTION CREATOR    ---- */
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

/* ----   ****    ---- */

/* ----   SET_CHATROOM ACTION CREATOR    ---- */
export const setChatroom = (currentChatroom) => async (dispatch) => {
  dispatch({
    type: SET_CHATROOM,
    payload: { currentChatroom },
  });
};
/* ----   ****    ---- */

export const setSocket = (socket) => (dispatch) => {
  dispatch({
    type: SET_SOCKET,
    payload: socket,
  });
};
