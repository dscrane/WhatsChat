import api from '../../utils/api';
import history from '../../history';

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
  console.log(`[AUTH]: jwt-token=${token}`)
  dispatch({
    type: 'CHECK_AUTH',
    payload: {
     token,
     isLoggedIn: true
    }
  })
}

export const signup = (formValues) => async dispatch => {
  const response = await api.post(
    '/create-user',
    { ...formValues }
  )
  console.log(response.data.error)
  const userData = response.data.user;

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
      [userData._id]: {
        token: userData.token,
        attributes: userData.user,
        isLoggedIn: true
      }
    }
  })
}

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
    token: response.data.token,
    attributes: response.data.user
  }
  })

  history.push(`/profile/${response.data.user._id}`);
}

export const fetchUserData = () => async (dispatch, getState) => {
  const { token } = getState().userState
  console.log(token);
  const response = await api.get(
    `/user`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  console.log('[RESPONSE]', response)

  dispatch({
    type: 'FETCH_USER',
    payload: {
      attributes: response.data.user
    }
  })
}