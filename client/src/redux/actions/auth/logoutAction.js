/* ----   LOG_OUT ACTION CREATOR    ---- */
import api from "../../../api";
import history from "../../../history";

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
       isLoggedIn: false
     }
   })
  localStorage.removeItem('jwt-token');
  history.push('/')
}
/* ----   ****    ---- */