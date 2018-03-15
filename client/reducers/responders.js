
const reducer = (state = [], { type, response, params }) => {
  switch (type) {
    case 'DELETE_RESPONDER_SUCCESS':
      return state.filter(it => it.ResponderId !== params.ResponderId)
    case 'GET_RESPONDERS_SUCCESS':
      return response;
    default:
      return state
  }
}

export default reducer
