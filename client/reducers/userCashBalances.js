const reducer = (state = null, action) => {
  switch (action.type) {
    case 'START_TRANSFERRING_FUNDS':
      return action.balanceInfo || null;
    default:
      return state
  }
}

export default reducer
