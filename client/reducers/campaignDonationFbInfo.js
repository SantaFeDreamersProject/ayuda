

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CAMPAIGN_LOAD_FB_DONOR_INFO_SUCCESS':
      return action.donorInfo
    default:
      return state
  }
}

export default reducer
