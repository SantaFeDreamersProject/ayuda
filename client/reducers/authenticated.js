import { hasSession } from 'client/data/userLocalSession'

const reducer = (state = hasSession(), action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return true;
    case 'LOGGED_OUT_SUCCESSFULLY':
      return false;
    case 'LOGGED_SUCCESSFULLY':
      return true;
    case 'LOGGED_FAILED':
      return false;
    default:
      return state
  }
}

export default reducer
