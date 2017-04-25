import {
  createCallout as apiCreateCallout,
  getCallouts as apiGetCallouts,
  getCallout as apiGetCallout
} from 'client/data'

export function createCallout(callout) {
  return {
    type: 'CREATE_CALLOUT',
    callAPI: () => apiCreateCallout(callout)
  }
}

export function getCallouts() {
  return {
    type: 'GET_CALLOUTS',
    callAPI: () => apiGetCallouts()
  }
}

export function getCallout(id) {
  return {
    type: 'GET_CALLOUT',
    callAPI: () => apiGetCallout(id)
  }
}
