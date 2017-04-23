import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import authenticated from 'client/reducers/authenticated'
import loading from 'client/reducers/loading'
import activate from 'client/reducers/activate'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  authenticated,
  loading,
  form: formReducer,
  routing: routerReducer
})

export default reducers
