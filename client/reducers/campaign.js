import {fromJS} from 'immutable'

const reducer = (state = null, action) => {

  if ([
    'CAMPAIGN_CREATE_SUCCESS',
    'CAMPAIGN_LOADED_SUCCESS',
    'CAMPAIGN_SAVED_SUCCESS'].indexOf(action.type) >= 0) {
    return action.campaign;
  }


  if (['CAMPAIGN_DELETE_PHOTO_SUCCESS',
       'CAMPAIGN_ADD_PHOTO_SUCCESS'].indexOf(action.type) >= 0) {
    let campaign = state;
    campaign.profilePics = action.campaign.profilePics;

    return Object.assign({}, campaign);
  }
  return state;
}

export default reducer
