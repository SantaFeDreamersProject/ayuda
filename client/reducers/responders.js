
const reducer = (state = [], { type, response }) => {
  switch (type) {
    case 'GET_RESPONDERS_SUCCESS':
      return response;
    default:
      return state
  }
}

export default reducer
