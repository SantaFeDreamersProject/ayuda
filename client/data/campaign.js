import axios from 'axios'
import fileHelper from './fileHelper'
import {get as getUser} from './user'


export function getDonations(campaignSlug, pageNum = 1, pageSize = 20) {
  //Req: curl -i -XGET 'localhost:4569/donations/byCampaignSlug/testcampaign-1461734320?pageNumber=2&pageSize=4'
  return axios.get(`/api-donations/donations/byCampaignSlug/${campaignSlug}?pageNumber=${pageNum}&pageSize=${pageSize}`)
    .then(res => res.data)
}

export function thankDonor(donationId) {
  //Req: curl -i -XPOST 'localhost:4569/donations/7055eb6d-01e2-409d-8435-58c6ae97bcab/thankYou'
  return axios.post(`/api-donations/donations/${donationId}/thankYou`)
    .then(res => res.data)
}

export function donate(
  accessToken,
  campaignUserSlug,
  campaignSlug,
  amountInCents,
  paymentToken,
  currencyString,
  firstName,
  donorProfilePic,
  userId) {
  //Req: curl -i -XPOST 'localhost:4569/donations' -d '{"userSlug":"test-user-1461137856", "campaignSlug":"testcampaign-1461734320", "amountInCents":100, "paymentToken":"tok_184yPYHngV6Dzl2IwVR7ng1w","currencyString":"usd", "firstName":"testuser1"}'
  //

  let path = '/api-donations/donations'
  if (accessToken) {
    path += `?token=${accessToken}`
  }
  return axios.post(path, {
    campaignUserSlug,
    campaignSlug,
    amountInCents,
    paymentToken,
    currencyString,
    firstName,
    donorProfilePic,
    userId
  })
}

export function createCampaign(campaignObj) {
  return axios.post('/api-campaign/campaigns', campaignObj)
    .then(res => res.data.data);
}

export function updateCampaign(accessToken, campaignObj) {
  return axios.patch(`/api-campaign/campaigns/${campaignObj.campaignId}?token=${accessToken}`, campaignObj)
    .then(res => res.data.data);
}


export function getCampaign(accessToken) {

  return _getCampaign(`/api-campaign/campaigns/byToken/${accessToken}`)

}

export function getCampaignBySlug(slug, accessToken) {

  return _getCampaign(`/api-campaign/campaigns/bySlug/${slug}/minified?token=${accessToken}`)

}

const _getCampaign = (path) => {

  return axios.get(path)
    .then(res => res.data)
    .then(data => {//because sometimes there is a data property...
      if (data.data) return data.data;
      return data;
    })

}

export function addCampaignPhoto(accessToken, campaignId, file) {
  let path = `/api-campaign/campaigns/${campaignId}/uploadProfilePic?token=${accessToken}`;
  return fileHelper.upload(
    path,
    file,
    'image')
    .then(res => res.data)
}

export function deleteCampaignPhoto(accessToken, campaignId, profilePicId) {
  return axios.delete(`/api-campaign/campaigns/${campaignId}/profilePic/${profilePicId}?token=${accessToken}`)
    .then(res => res.data.data);
}
