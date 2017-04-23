const reducer = (state = false, action) => {
  switch (action.type) {
    case 'START_TRANSFERRING_FUNDS':
      return action.canTransfer;
    default:
      return state
  }
}

export default reducer
