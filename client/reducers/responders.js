
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_RESPONDERS_SUCCESS':
      return action.response;
    default:
      return state
  }
}

export default reducer
