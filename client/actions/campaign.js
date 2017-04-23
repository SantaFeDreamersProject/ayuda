import {
  getCampaign as apiGetCampaign,
  getCampaignBySlug as apiGetCampaignBySlug,
  updateCampaign as apiUpdateCampaign,
  addCampaignPhoto as apiAddCampaignPhoto,
  deleteCampaignPhoto as apiDeleteCampaignPhoto,
  donate as apiDonate,
  thankDonor as apiThankDonor,
  getDonations as apiGetDonations
} from 'client/data/campaign'

import {
  getUserByToken
} from 'client/data/user'

import { connect as connectFb } from 'client/lib/fb'
import { setToken, getToken } from 'client/data/userLocalSession'
import { browserHistory } from 'react-router'

export function loadFbDonorInfo() {

  return dispatch => {
    return connectFb()
      .then(response => {
        FB.api('/me', {fields: 'last_name,first_name,picture'}, function(response) {
          dispatch(loadFbDonorInfoSuccess({
            name: `${response.first_name} ${response.last_name}`,
            photoUri: response.picture.data.url
          }))
        });

      })
      .catch(e => {
        //swallow for now..
      })

  }


}

export function loadFbDonorInfoSuccess(donorInfo) {
  return dispatch => {
    dispatch({donorInfo, type: 'CAMPAIGN_LOAD_FB_DONOR_INFO_SUCCESS' });
  };
}

export function getMoreDonations(campaignSlug, pageNumber) {

  return (dispatch, getState) => {

    apiGetDonations(campaignSlug, pageNumber, 10)
      .then(donations => dispatch(getDonationsSuccess({
        pageNumber,
        donations
      })))
      .catch(error => dispatch(getDonationsFailure(error)))
  }
}

export function getDonationsSuccess(page) {
  return dispatch => {
    dispatch({page, type: 'CAMPAIGN_GET_DONATIONS_SUCCESS' });
  };
}

export function getDonationsFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_GET_DONATIONS_FAILURE' });
  };
}

export function thankDonor(donationId) {

  return (dispatch, getState) => {

    let { campaign } = getState();
    let { userSlug, campaignSlug } = campaign;

    apiThankDonor(donationId)
      .then(() => dispatch(thankDonorSuccess()))
      .then(() => dispatch(loadCampaign(campaignSlug, userSlug)))
      .catch(error => dispatch(thankDonorFailure(error)))
  }

}

export function donate(paymentTokenId) {

  return (dispatch, getState) => {

    let { campaign, campaignDonation, routing, user } = getState();
    let { amount, currency, name, photoUri } = campaignDonation
    let { userSlug, campaignSlug } = campaign;

    apiDonate(
      getToken(),
      userSlug,
      campaignSlug,
      amount * 100,
      paymentTokenId,
      currency || 'USD',
      name,
      photoUri,
      user ? user.userId : null)
      .then(() => dispatch(donateSuccess()))
      .then(() => dispatch(loadCampaign(campaignSlug, userSlug)))
      .catch(error => dispatch(donateFailure(error)))
  }

}

export function thankDonorSuccess() {
  return dispatch => {
    dispatch({type: 'CAMPAIGN_DONATION_THANK_SUCCESS' });
  };
}

export function thankDonorFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_DONATION_THANK_FAILURE' });
  };
}


export function donateSuccess() {
  return dispatch => {
    dispatch({type: 'CAMPAIGN_DONATION_SUCCESS' });
  };
}

export function donateFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_DONATION_FAILURE' });
  };
}


export function campaignLoadedSuccess(campaign) {
  return dispatch => {
    dispatch({ campaign, type: 'CAMPAIGN_LOADED_SUCCESS' });
  };
}

export function campaignLoadedFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_LOADED_FAILURE' });
  };
}

export function campaignSavedSuccess(campaign) {
  return dispatch => {
    dispatch({ campaign, type: 'CAMPAIGN_SAVED_SUCCESS' });
  };
}

export function campaignSavedFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_SAVED_FAILURE' });
  };
}

export function campaignAddPhotoSuccess(campaign) {
  return dispatch => {
    dispatch({ campaign, type: 'CAMPAIGN_ADD_PHOTO_SUCCESS' });
  };
}

export function campaignAddPhotoFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_ADD_PHOTO_FAILURE' });
  };
}

export function campaignDeletePhotoSuccess(campaign) {
  return dispatch => {
    dispatch({ campaign, type: 'CAMPAIGN_DELETE_PHOTO_SUCCESS' });
  };
}

export function campaignDeletePhotoFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_DELETE_PHOTO_FAILURE' });
  };
}

export function startEditingCampaign() {
  return dispatch => {
    dispatch({ type: 'START_EDITING_CAMPAIGN' });
  };
}

export function cancelEditingCampaign() {
  return dispatch => {
    dispatch({ type: 'CANCEL_EDITING_CAMPAIGN' });
  };
}

export function startSharingCampaign() {
  return dispatch => {
    dispatch({ type: 'START_SHARING_CAMPAIGN' });
  };
}

export function cancelSharingCampaign() {
  return dispatch => {
    dispatch({ type: 'CANCEL_SHARING_CAMPAIGN' });
  };
}

export function startContribCampaign() {
  return dispatch => {
    dispatch({ type: 'START_CONTRIB_CAMPAIGN' });
  };
}

export function cancelContribCampaign() {
  return dispatch => {
    dispatch({ type: 'CANCEL_CONTRIB_CAMPAIGN' });
  };
}

export function startContribCampaignCheckout(donation) {
  return dispatch => {
    dispatch({ donation, type: 'START_CONTRIB_CAMPAIGN_CHECKOUT' });
  };
}

export function cancelContribCampaignCheckout() {
  return dispatch => {
    dispatch({ type: 'CANCEL_CONTRIB_CAMPAIGN_CHECKOUT' });
  };
}

export function addCampaignPhoto(file) {
  return (dispatch, getState) => {
    let {campaign} = getState()
    let {campaignId} = campaign;

    apiAddCampaignPhoto(getToken(), campaignId, file)
      .then(campaign => dispatch(campaignAddPhotoSuccess(campaign)))
      .catch(error => dispatch(campaignAddPhotoFailure(error)))

  }
}

export function deleteCampaignPhoto(profilePicId) {

  return (dispatch, getState) => {
    let {campaign} = getState()
    let {campaignId} = campaign;

    apiDeleteCampaignPhoto(getToken(), campaignId, profilePicId)
      .then(campaign => dispatch(campaignDeletePhotoSuccess(campaign)))
      .catch(error => dispatch(campaignDeletePhotoFailure(error)))

  }

}

export function saveCampaign(changes) {
  return (dispatch, getState) => {

    let {campaign} = getState()

    let mutation = Object.assign({campaignId: campaign.campaignId}, changes);

    let newCampaign = Object.assign({}, campaign, changes);

    apiUpdateCampaign(getToken(), mutation)
      .then(campaign => dispatch(campaignSavedSuccess(newCampaign)))
      .catch(error => dispatch(campaignSavedFailure(error)))
  }
}

export function loadCampaign(slug, userSlug) {
  return dispatch => {

    (slug ? apiGetCampaignBySlug(slug, getToken()) : apiGetCampaign(getToken()))
      .then(campaign => {
        Object.assign(campaign, {campaignSlug: slug, userSlug})
        dispatch(campaignLoadedSuccess(campaign))
        dispatch(getMoreDonations(slug))
      })
      .catch(error => dispatch(campaignLoadedFailure(error)))
  }

}


export function goToCampaign() {
  return (dispatch, getState) => {

    Promise.all(
      [
        apiGetCampaign(getToken()),
      ])
      .then(([campaign, user]) => {
        browserHistory.push(`/u/${campaign.userSlug}/c/${campaign.campaignSlug}`)
      })

  }
}
const _getSessionCampaign = () => apiGetCampaign(getToken())
