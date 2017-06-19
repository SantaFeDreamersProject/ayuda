import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import loading from 'client/reducers/loading'
import responders from 'client/reducers/responders'
import responseSubmissions from 'client/reducers/responseSubmissions'
import calloutSubmitted from 'client/reducers/calloutSubmitted'
import responderSubmitted from 'client/reducers/responderSubmitted'
import callout from 'client/reducers/callout'
import error from 'client/reducers/error'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  loading,
  responders,
  calloutSubmitted,
  responderSubmitted,
  responseSubmissions,
  callout,
  error,
  form: formReducer,
  routing: routerReducer
})

export default reducers
