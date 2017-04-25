
const reducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_CALLOUT_SUCCESS':
      return action.response;
    default:
      return state
  }
}

export default reducer
