
const reducer = (state = null, { type, error }) => {
  if (type.indexOf('@@') === -1 && type.indexOf('_FAILURE') >=0 && error) {
    return error
  }
  return state;
}

export default reducer
