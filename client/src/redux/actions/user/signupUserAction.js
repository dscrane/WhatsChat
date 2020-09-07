/* ----   SIGN_UP ACTION CREATOR    ---- */
import api from "../../../api";
import history from "../../../history";

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

    localStorage.setItem('jwt-token', response.data.token);

    dispatch({
     type: 'CHECK_AUTH',
     payload: {
       _id: response.data.user._id,
       token: response.data.user.token,
       isLoggedIn: true
     }
   })

  history.push(`/profile/${response.data.user._id}`)
}
/* ----   ****    ---- */