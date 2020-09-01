export const logoutUser = () => (dispatch, getState) => {
  const { _id } = getState().auth
  console.log(_id);
  console.log('userlogout ran')
  dispatch({
    type: 'LOGOUT_USER',
    payload: _id
  })
}