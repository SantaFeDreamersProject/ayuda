import {fromJS} from 'immutable'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'FB_CONNECTED_SUCCESSFULLY':
      return action.signupSuggestedValues;
    default:
      return state
  }
}

export default reducer
