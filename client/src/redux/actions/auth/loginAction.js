/* ----   LOG_IN ACTION CREATOR    ---- */
import api from "../../../utils/api";
import history from "../../../history";

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