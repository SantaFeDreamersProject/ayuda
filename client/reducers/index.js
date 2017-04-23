import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import authenticated from 'client/reducers/authenticated'
import user from 'client/reducers/user'
import signupFbToken from 'client/reducers/signupFbToken'
import signupSuggestedValues from 'client/reducers/signupSuggestedValues'
import campaignNew from 'client/reducers/campaignNew'
import campaign from 'client/reducers/campaign'
import campaignEditing from 'client/reducers/campaignEditing'
import campaignSharing from 'client/reducers/campaignSharing'
import userTransferring from 'client/reducers/userTransferring'
import userCanTransfer from 'client/reducers/userCanTransfer'
import userCashBalances from 'client/reducers/userCashBalances'
import userRequiredTransferFields from 'client/reducers/userRequiredTransferFields'
import userRequiredTransferFieldsErrors from 'client/reducers/userRequiredTransferFieldsErrors'
import campaignDonation from 'client/reducers/campaignDonation'
import campaignDonationFbInfo from 'client/reducers/campaignDonationFbInfo'
import campaignDonationList from 'client/reducers/campaignDonationList'
import campaignContributing from 'client/reducers/campaignContributing'
import campaignContributingCheckout from 'client/reducers/campaignContributingCheckout'
import loading from 'client/reducers/loading'
import activate from 'client/reducers/activate'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  campaignNew,
  campaign,
  campaignEditing,
  campaignSharing,
  userTransferring,
  campaignContributing,
  campaignContributingCheckout,
  campaignDonation,
  campaignDonationFbInfo,
  campaignDonationList,
  authenticated,
  user,
  userCashBalances,
  userCanTransfer,
  userRequiredTransferFields,
  userRequiredTransferFieldsErrors,
  signupFbToken,
  signupSuggestedValues,
  loading,
  activate,
  form: formReducer,
  routing: routerReducer
})

export default reducers
