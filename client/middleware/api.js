/**
 * Action middleware for api calls
 *
 * @param  {[type]} dispatch [description]
 * @param  {[type]} getState [description]
 * @return [type]            [description]
 */
const callAPIMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    const {
      type,
      callAPI,
      useCache = () => true,
      payload = {},
      params
    } = action

    if (!type) {
      // Normal action: pass it on
      return next(action)
    }

    if (typeof callAPI !== 'function') {
      return next(action)
    }

    const requestType = type + '_REQUEST'
    const successType = type + '_SUCCESS'
    const failureType = type + '_FAILURE'

    /**
     * If there is no action type constant for the API request, then it is not
     * an API action, and we don't want to use this middleware.
     */

    if (
      typeof type !== "string"
    ) {
      throw new Error(`Expected an string argument for type ${type}.`)
    }

    if (!useCache(getState())) {
      return
    }

    dispatch(Object.assign({}, payload, {
      type: requestType
    }))

    return callAPI().then(
      response => {
        console.log('***************')
        console.log(`API Middleware - success response for ${type}`)
        console.log('***************')
        dispatch(Object.assign({}, payload, {
          response,
          type: successType,
          params
        }))
      },
      error => {
        console.log('***************')
        console.log(`API Middleware - failure response for ${type}`)
        console.log(error)
        console.log('***************')
        dispatch(Object.assign({}, payload, {
          error,
          type: failureType
        }))
      }
    )
  }
}

export default callAPIMiddleware
