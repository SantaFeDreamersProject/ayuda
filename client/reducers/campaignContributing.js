
const reducer = (state = false, action) => {
  switch (action.type) {
    case 'START_CONTRIB_CAMPAIGN':
      return true
    // case 'CAMPAIGN_SAVED_SUCCESS':
    //   return false
    case 'CAMPAIGN_DONATION_SUCCESS':
      return false
    case 'CANCEL_CONTRIB_CAMPAIGN':
      return false
    default:
      return state
  }
}

export default reducer
