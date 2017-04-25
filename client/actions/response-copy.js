import {
  createResponse as apiCreateResponse
} from 'client/data'

export function createResponse(response) {
  return {
    type: 'CREATE_RESPONSE',
    callAPI: () => apiCreateResponse(response)
  }
}
