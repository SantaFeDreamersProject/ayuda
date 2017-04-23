import { hasSession } from 'client/data/userLocalSession'

const reducer = (state = false, action) => {
  switch (action.type) {
    case 'ACTIVATE_SUCCESS':
      return true;
    case 'ACTIVATE_FAILED':
      return false;
    default:
      return state
  }
}

export default reducer
