/* ----   FETCH_USER ACTION CREATOR    ---- */
import api from "../../../api";
import history from "../../../history";

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