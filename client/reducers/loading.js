import {fromJS} from 'immutable'

const reducer = (state = false, action) => {
  switch (action.type) {
    case 'LOADING_STARTED':
      return true;
    case 'LOADING_STOPPED':
      return false;
    default:
      return state
  }
}

export default reducer
