import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import loading from 'client/reducers/loading'
import responders from 'client/reducers/responders'
import callout from 'client/reducers/callout'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  loading,
  responders,
  callout,
  form: formReducer,
  routing: routerReducer
})

export default reducers
