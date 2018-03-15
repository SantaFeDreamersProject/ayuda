require('es6-promise').polyfill();
require('isomorphic-fetch');

const _req = (method, url, body) => {

  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    body: body && JSON.stringify(body)
  })
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }

    if (response && response.json) return response.json();
  })

}

export const createResponder = (payload) => {
  return _req('POST', '/api/responder', payload)
}

export const removeResponder = (id) => {
  return _req('DELETE', `/api/responder/${id}`)
}

export const getResponders = () => {
  return _req('GET', '/api/responders')
}

export const createCallout = (payload) => {
  return _req('POST', '/api/callout', payload)
}

export const getCallouts = () => {
  return _req('GET', '/api/callouts')
}

export const getCallout = (id) => {
  return _req('GET', `/api/callouts/${id}`)
}

export const createResponse = (payload) => {
  return _req('POST', '/api/response', payload)
}
