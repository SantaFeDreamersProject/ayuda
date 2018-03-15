import {
  createResponder as apiCreateResponder,
  getResponders as apiGetResponders,
  removeResponder as apiRemoveResponder
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

export function removeResponder(id) {
  return {
    type: 'DELETE_RESPONDER',
    callAPI: () => apiRemoveResponder(id),
    params: {ResponderId: id}
  }
}
