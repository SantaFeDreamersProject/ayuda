
const reducer = (state = {donations: {donations: [], count: 0}}, action) => {
  switch (action.type) {
    case 'CAMPAIGN_GET_DONATIONS_SUCCESS':
      return action.page
    case 'CAMPAIGN_GET_DONATIONS_FAILURE':
      return state
    default:
      return state
  }
}

export default reducer
