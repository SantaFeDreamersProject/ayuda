
const reducer = (state = false, action) => {
  switch (action.type) {
    case 'START_EDITING_CAMPAIGN':
      return true
    case 'CAMPAIGN_SAVED_SUCCESS':
      return false
    case 'CANCEL_EDITING_CAMPAIGN':
      return false
    default:
      return state
  }
}

export default reducer
