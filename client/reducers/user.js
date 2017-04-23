import { hasSession } from 'client/data/userLocalSession'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'EDIT_PHOTO_SUCCESS':
      return Object.assign({}, state, {profilePic: action.profilePic})
    case 'LOAD_USER_SUCCESSFULLY':
      return action.user;
    case 'SIGNUP_SUCCESS':
      return action.user;
    case 'LOGGED_SUCCESSFULLY':
      return action.user;
    case 'LOGGED_OUT_SUCCESSFULLY':
      return false;
    case 'LOGGED_FAILED':
      return false;
    default:
      return state
  }
}

export default reducer
