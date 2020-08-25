import history from '../../history';

export const signup = (formValues) => (dispatch, getState) => {
  dispatch({
    type: 'SIGN_UP',
    payload: formValues
  })

  history.push('/profile')
}