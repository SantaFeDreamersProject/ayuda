import {fromJS} from 'immutable'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'FB_CONNECTED_SUCCESSFULLY':
      return action.fbToken;
    default:
      return state
  }
}

export default reducer
