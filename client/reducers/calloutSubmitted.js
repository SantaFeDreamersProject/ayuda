
const reducer = (state = false, { type, response }) => {
  switch (type) {
    case 'CREATE_CALLOUT_SUCCESS':
      return true;
    default:
      return state
  }
}

export default reducer
