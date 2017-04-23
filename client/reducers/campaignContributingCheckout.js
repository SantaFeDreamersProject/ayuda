
const reducer = (state = false, action) => {
  switch (action.type) {
    case 'START_CONTRIB_CAMPAIGN_CHECKOUT':
      return true
    case 'CAMPAIGN_DONATION_SUCCESS':
      return false
    case 'CANCEL_CONTRIB_CAMPAIGN_CHECKOUT':
      return false
    default:
      return state
  }
}

export default reducer
