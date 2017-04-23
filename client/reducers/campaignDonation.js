

const reducer = (state = false, action) => {
  switch (action.type) {
    case 'START_CONTRIB_CAMPAIGN_CHECKOUT':
      return action.donation
    case 'CANCEL_CONTRIB_CAMPAIGN_CHECKOUT':
      return false
    default:
      return state
  }
}

export default reducer
