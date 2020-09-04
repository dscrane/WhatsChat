/* ----   CHECK_AUTH ACTION CREATOR    ---- */
import api from "../../../api";

export const checkAuth = () => async dispatch => {
  console.log(api)
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
       _id: response.data._id,
       token,
       isLoggedIn: true,
       data: response.data
     }
   })

}
/* ----   ****    ---- */