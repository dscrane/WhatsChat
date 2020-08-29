import api from '../../utils/api';
import history from '../../history';

/* ----   CHECK_AUTH ACTION CREATOR    ---- */
export const checkAuth = () => async dispatch => {
  const token = localStorage.getItem('jwt-token');

  if (!token) {
    console.log('[AUTH]: No Token')
    return dispatch({
      type: 'CHECK_AUTH',
      payload: {
        isLoggedIn: false,
        token: null
      }
    })
  }
  console.log(`[AUTH-TOKEN]: jwt-token=${token}`)

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
      _id: response.data,
     token,
     isLoggedIn: true
    }
  })

}
/* ----   ****    ---- */

/* ----   SIGN_UP ACTION CREATOR    ---- */
export const signup = (formValues) => async dispatch => {
  const response = await api.post(
    '/create-user',
    { ...formValues }
  )

  if (response.data.error) {
    const error = response.data.error;
    if (error.code === 11000) {
      alert(`The username "${error.keyValue.username}" has already been taken.`)
    }
    return
  }

  dispatch({
    type: 'LOG_IN',
    payload: {
      _id: response.data.user._id,
      token: response.data.user.token,
      isLoggedIn: true
    }
  })
}
/* ----   ****    ---- */

/* ----   LOG_IN ACTION CREATOR    ---- */
export const login = formValues => async dispatch => {
  const response = await api.post(
    '/login-user',
    { ...formValues },
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
    isLoggedIn: true
  }
  })

  history.push(`/profile/${response.data.user._id}`);
}
/* ----   ****    ---- */

/* ----   FETCH_USER ACTION CREATOR    ---- */
export const fetchUserData = () => async (dispatch, getState) => {
  const { token, isLoggedIn, _id } = getState().auth
  const response = await api.get(
    `/user`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    },
  );
  console.group('[FETCH_USER]')
  console.log('[TOKEN]:',token);
  console.log('[RESPONSE]', response)
  console.groupEnd()

  dispatch({
    type: 'FETCH_USER',
    payload: { ...response.data.user }
  })

  if (!isLoggedIn) {
    history.push(`/`)
  }

    history.push(`/profile/${_id}`)
}
/* ----   ****    ---- */

/* ----   LOG_OUT ACTION CREATOR    ---- */
export const logout = () => async (dispatch, getState) => {
  const { token } = getState().auth
  console.log(token)
  const response = await api.post(
    '/logout',
    {},
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
    console.log(response.data)

  dispatch({
    type: 'LOG_OUT',
    payload: {
      _id: null,
      token: null,
      attributes: {},
      isLoggedIn: false
    }
  })
  localStorage.removeItem('jwt-token');
  history.push('/')
}
/* ----   ****    ---- */