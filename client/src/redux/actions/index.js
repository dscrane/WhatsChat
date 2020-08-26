import api from '../../utils/api';
import history from '../../history';

export const signup = (formValues) => async (dispatch, getState) => {
  const response = await api.post(
    '/create-user',
    { ...formValues }
  )
  console.log(response)
  dispatch({
    type: 'LOG_IN',
    payload: { user: {
        token: response.token,
        attributes: response.user,

      } }
  })

  history.push('/profile')
}

export const login = formValues => async (dispatch, getState) => {
  const response = await api.post(
    '/login-user',
    { ...formValues }
  )
  console.log(response.data)

  dispatch({
    type: 'LOG_IN',
    payload: {
      token: response.token,
      attributes: response.user
    }
  })

  history.push('/profile');
}