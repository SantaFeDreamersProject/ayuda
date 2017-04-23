import axios from 'axios'
import fileHelper from './fileHelper'

export function login(credentials) {
  return axios.post('/api-user/users/login', credentials)
    .then(res => res.data.data);

}

export function loginFb(token) {
  return axios.post(`/api-user/users/fb/login?fbToken=${token}`)
    .then(res => res.data.data);
}

export function activate(token) {
  return axios.patch(`/api-user/users/${token}/activate`)
    .then(res => res.data.data);
}

export function signup(userData) {
  return axios.post('/api-user/users/signup', userData)
    .then(res => res.data.data);
}

export function signupFb(userData) {
  return axios.post('/api-user/users/fb/signup', userData)
    .then(res => res.data.data);
}

export function signupStripe(userId, accessToken) {
  let ts = new Date().getTime();
  return axios.post(`/api-user/users/${userId}/paymentProfile?tosTimestampInMillis=${ts}&token=${accessToken}`);
  //Req: curl -i -XPOST 'localhost:4567/users/1a6a7a830f86c7b36c299494eb5e3a92118037d5d5fecc0f6acba80a93aae61b/paymentProfile?tosTimestampInMillis=1461622327000&tosIP=75.82.205.237'
}

export function get(id) {
  return axios.get(`/api-user/users/${id}`)
    .then(res => res.data.data);
}

export function getUserByToken(accessToken) {

  //curl -XGET 'localhost:4567/users/byToken/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMzYzNGI5MTU0MzgwMmZmYjYxMzk1ZDkxYTgzYWViYTU0ZTEyMGRiMmZlYmI4ZmFkN2M5YjEzZGViOTcxYTEyIn0.m0BiopdId3pf-mTpIeztMSPBHm41-cYVAY-Qhaj4Q4cEAkPOz4cdJrlr4pAgs9xvtFtre8hr7rNJEo_Jbl1GYg'
  //

  return axios.get(`/api-user/users/byToken/${accessToken}`)
    .then(res => res.data.data);

}

export function updatePhoto(userId, accessToken, file) {
  return fileHelper.upload(
    `/api-user/users/${userId}/uploadProfilePic?token=${accessToken}`,
    file,
    'image')
    .then(res => res.data)
}

export function getFbProfile(fbToken) {

  return axios.get(`/api-user/users/fb/profile?fbToken=${fbToken}`)
    .then(res => res.data.data);

}

export function canTransferFunds(accessToken) {
  //localhost:4567/users/byToken/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlYzY3OTc4MzIyZTVmYmQ3NjA0ZThkYjJhZDBlODlhYjFmYzRiN2RlZTBhOWE5NjU1ZmI2NjJiOGFlNjQ3ZTcxIn0.gAarGBEnQf11oc8h2bfyaiLoBYGOiaj_Lrjb-KV_SL5GZECE7j50wegLkI7ea1RfNAZBhFFa6LV4IPJQ7I3rjA/isTransfersEnabled
  return axios.get(`/api-user/users/byToken/${accessToken}/isTransfersEnabled`)
    .then(res => res.data.isTransfersEnabled);
}

export function getCashBalance(accessToken) {

  //'localhost:4567/users/byToken/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlYzY3OTc4MzIyZTVmYmQ3NjA0ZThkYjJhZDBlODlhYjFmYzRiN2RlZTBhOWE5NjU1ZmI2NjJiOGFlNjQ3ZTcxIn0.gAarGBEnQf11oc8h2bfyaiLoBYGOiaj_Lrjb-KV_SL5GZECE7j50wegLkI7ea1RfNAZBhFFa6LV4IPJQ7I3rjA/balance'

  return axios.get(`/api-user/users/byToken/${accessToken}/balance`)
    .then(res => res.data);

}

export function transferFunds(accessToken, amountInCents, currency = 'usd') {
  //Req: curl -i -XPOST 'localhost:4567/users/byToken/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlYzY3OTc4MzIyZTVmYmQ3NjA0ZThkYjJhZDBlODlhYjFmYzRiN2RlZTBhOWE5NjU1ZmI2NjJiOGFlNjQ3ZTcxIn0.gAarGBEnQf11oc8h2bfyaiLoBYGOiaj_Lrjb-KV_SL5GZECE7j50wegLkI7ea1RfNAZBhFFa6LV4IPJQ7I3rjA/cashout?currencyString=usd&amountInCents=5'

  return axios.post(`/api-user/users/byToken/${accessToken}/cashout?currencyString=${currency}&amountInCents=${amountInCents}`)
    .then(res => res.data);
}

export function getTransferRequiredFields(accessToken) {
  //localhost:4567/users/byToken/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlYzY3OTc4MzIyZTVmYmQ3NjA0ZThkYjJhZDBlODlhYjFmYzRiN2RlZTBhOWE5NjU1ZmI2NjJiOGFlNjQ3ZTcxIn0.gAarGBEnQf11oc8h2bfyaiLoBYGOiaj_Lrjb-KV_SL5GZECE7j50wegLkI7ea1RfNAZBhFFa6LV4IPJQ7I3rjA/verificationieldsNeeded
  //
  return axios.get(`/api-user/users/byToken/${accessToken}/verificationFieldsNeeded`)
    .then(res => res.data);
}

export function saveTransferFields(accessToken, fields) {
  //'localhost:4567/users/byToken/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlYzY3OTc4MzIyZTVmYmQ3NjA0ZThkYjJhZDBlODlhYjFmYzRiN2RlZTBhOWE5NjU1ZmI2NjJiOGFlNjQ3ZTcxIn0.gAarGBEnQf11oc8h2bfyaiLoBYGOiaj_Lrjb-KV_SL5GZECE7j50wegLkI7ea1RfNAZBhFFa6LV4IPJQ7I3rjA/fieldsNeeded' -d
console.log(fields)
return axios.patch(`/api-user/users/byToken/${accessToken}/fieldsNeeded`, fields)
  .then(res => res.data);
}
