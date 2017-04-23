const reducer = (state = false, action) => {
  switch (action.type) {
    case 'START_TRANSFERRING_FUNDS':
      return true
    case 'CANCEL_TRANSFERRING_FUNDS':
      return false
    default:
      return state
  }
}

export default reducer
