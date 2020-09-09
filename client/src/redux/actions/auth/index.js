import api from "../../../api";
import history from "../../../history";

/* ----   CHECK_AUTH ACTION CREATOR    ---- */
export const checkAuth = () => async dispatch => {
  console.log(localStorage.getItem('jwt-token'))
  const token = localStorage.getItem('jwt-token');
  console.log(token)
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

  await api.post(
    '/logout',
    {},
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
  await localStorage.removeItem('jwt-token');

  dispatch({
   type: 'LOG_OUT',
  })
  }
/* ----   ****    ---- */

/* ----   SIGN_UP ACTION CREATOR    ---- */
export const signup = (formValues) => async dispatch => {
  const response = await api.post('/create-user', { ...formValues })
  console.log(response)
  if (response.data.error) {
    const error = response.data.error;
    if (error.code === 11000) {
      alert(`The username "${error.keyValue.username}" has already been taken.`)
    }
    return
  }

  dispatch({
             type: 'CHECK_AUTH',
             payload: {
               _id: response.data.user._id,
               token: response.data.token,
               isLoggedIn: true,
               data: response.data.user
             }
           })

  history.push(`/profile/${response.data.user._id}`)
}
/* ----   ****    ---- */

/* ----   UPDATE_USER ACTION CREATOR    ---- */
export const updateUser = formValues => async (dispatch, getState) => {
  const {token} = getState().auth;
  const response = await api.patch(
    './user-update',
    {...formValues},
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  console.log(response);

  if (response.data.error) {
    const error = response.data.error;
    if (error.code === 11000) {
      alert(`The username "${error.keyValue.username}" has already been taken.`)
    }
    return
  }

  dispatch({
    type: 'UPDATE_USER',
    payload: response.data.user
  })
}

/* ----   ****    ---- */

/* ----   DELETE_USER ACTION CREATOR    ---- */
export const deleteUser = () => async (dispatch, getState) => {
  console.log(deleteUser)
  const {token} = getState().auth;
  const response = await api.post(
    '/user-delete',
    {},
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )


  if (response.data.userDeleted) {
    await localStorage.removeItem('jwt-token');
    dispatch({
     type: 'LOG_OUT',
    })
    history.push('/')
  }
}

/* ----   ****    ---- */
