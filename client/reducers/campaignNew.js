import {fromJS} from 'immutable'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CAMPAIGN_GOAL':
      let {target, reason} = action;
      return {target, reason};
    default:
      return state
  }
}

export default reducer
