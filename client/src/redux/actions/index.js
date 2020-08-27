import api from '../../utils/api';
import history from '../../history';

export const signup = (formValues) => async (dispatch, getState) => {
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
      }
    }
  })
}

export const login = formValues => async (dispatch, getState) => {
  const response = await api.post(
    '/login-user',
    { ...formValues }
  )
  if (response.data.error) {
    const error = response.data.error;
    alert(`${error.message}`)
    return;
  }

  dispatch({
    type: 'LOG_IN',
    payload: {
      token: response.data.token,
      attributes: response.data.user
    }
  })

  history.push(`/profile/${response.data.user._id}`);
}

export const fetchUserData = userId => async dispatch => {
  const response = await api.get(`/users/${userId}`);

  dispatch({
    type: 'FETCH_USER',
    payload: {
      token: response.data.token,
      attributes: response.data.user
    }
  })
}