import {
  createResponder as apiCreateResponder,
  getResponders as apiGetResponders
} from 'client/data'

export function createResponder(responder) {
  return {
    type: 'CREATE_RESPONDER',
    callAPI: () => apiCreateResponder(responder)
  }
}

export function getResponders() {
  return {
    type: 'GET_RESPONDERS',
    callAPI: () => apiGetResponders()
  }
}
