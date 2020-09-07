import api from "../../../api";
import history from "../../../history";

/* ----   CHECK_AUTH ACTION CREATOR    ---- */
export const checkAuth = () => async dispatch => {
  const token = localStorage.getItem('jwt-token');

  if (!token) {
    return dispatch({
      type: 'CHECK_AUTH',
      payload: {
        isLoggedIn: false,
        token: null
      }
    })
  }

  const response = await api.get(
    '/user-id',
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
  dispatch({
   type: 'CHECK_AUTH',
   payload: {
     _id: response.data._id,
     token,
     isLoggedIn: true,
     data: response.data
   }
  })
}
/* ----   ****    ---- */

/* ----   LOG_IN ACTION CREATOR    ---- */
export const login = formValues => async dispatch => {
  const response = await api.post(
    '/login-user',
    { ...formValues }
  )

  if (response.data.error) {
    const error = response.data.error;
    alert(`${error.message}`)
    return;
  }

  localStorage.setItem('jwt-token', response.data.token);

  dispatch({
   type: 'LOG_IN',
   payload: {
     _id: response.data.user._id,
     token: response.data.token,
     isLoggedIn: true,
     data: response.data.user
   }
 })

  history.push(`/profile/${response.data.user._id}`);
}
/* ----   ****    ---- */

/* ----   LOG_OUT ACTION CREATOR    ---- */
export const logout = () => async (dispatch, getState) => {
  const { token } = getState().auth

  const response = await api.post(
    '/logout',
    {},
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )

  dispatch({
   type: 'LOG_OUT',
   payload: {
     _id: null,
     token: null,
     isLoggedIn: false,
     data: {}
   }
  })

  localStorage.removeItem('jwt-token');

  history.push('/')
}
/* ----   ****    ---- */