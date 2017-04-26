
const reducer = (state = {}, { type, response }) => {
  switch (type) {
    case 'CREATE_RESPONSE_SUCCESS':
      state[response.CalloutId] = response
      return state;
    default:
      return state
  }
}

export default reducer
