const reducer = (state = [], action) => {
  switch (action.type) {
    case 'START_TRANSFERRING_FUNDS':
      return action.requiredFields || []
    case 'CANCEL_TRANSFERRING_FUNDS':
      return []
    default:
      return state
  }
}

export default reducer
