const reducer = (state = false, action) => {
  switch (action.type) {
    case 'START_SHARING_CAMPAIGN':
      return true
    case 'CANCEL_SHARING_CAMPAIGN':
      return false
    default:
      return state
  }
}

export default reducer
