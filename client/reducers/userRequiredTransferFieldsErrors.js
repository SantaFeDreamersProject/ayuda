const reducer = (state = [], action) => {
  switch (action.type) {
    case 'STRIPE_BANK_TOKEN_ERROR':
      return [action.error]
    default:
      return state
  }
}

export default reducer
