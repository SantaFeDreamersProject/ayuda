import { getToken } from 'client/data/userLocalSession'
import {
  updatePhoto as apiUpdatePhoto,
  canTransferFunds as apiCanTransferFunds,
  getTransferRequiredFields as apiGetTransferRequiredFields,
  saveTransferFields as apiSaveTransferFields,
  getCashBalance as apiGetCashBalance,
  transferFunds as apiTransferFunds
} from 'client/data/user'

import { browserHistory } from 'react-router'

export function setPhotoError(error) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({ error, type: 'EDIT_PHOTO_FAILED' });
  };
}

export function setPhotoSuccess(profilePic) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({profilePic, type: 'EDIT_PHOTO_SUCCESS' });
  };
}

export function setPhoto(userId, file) {

  return dispatch => {
    dispatch({type: 'LOADING_STARTED' });
    apiUpdatePhoto(userId, getToken(), file)
      .then((res) => {
        //TODO: dispatch the new photo URL ...
        dispatch(setPhotoSuccess(res.profilePic));
      })
      .catch(error => { dispatch(setPhotoError(error)) });
  }

}

export function startTransferringFunds() {
  return dispatch => {

    apiCanTransferFunds(getToken())
      .then(canTransfer => {
        if (canTransfer) {

          apiGetCashBalance(getToken())
            .then(balanceInfo => {
              dispatch({balanceInfo, canTransfer, type: 'START_TRANSFERRING_FUNDS' });
            })

        } else {
          apiGetTransferRequiredFields(getToken())
            .then(requiredFields => {
              dispatch({ canTransfer, requiredFields, type: 'START_TRANSFERRING_FUNDS' });
            })
        }
      })

  };
}

export function stripeBankAccountError(error) {
  return dispatch => {
    dispatch({ error, type: 'STRIPE_BANK_TOKEN_ERROR' });
  };
}


export function cancelTransferringFunds() {
  return dispatch => {
    dispatch({ type: 'CANCEL_TRANSFERRING_FUNDS' });
  };
}

export function transferFunds(amountInCents, currency) {
  return dispatch => {

    apiTransferFunds(getToken(), amountInCents, currency)
      .then(res => {
        dispatch({ type: 'FUNDS_TRANSFER_SUCCESS' });
        dispatch(cancelTransferringFunds())
      })
      .catch(res => {
        //TODO?

      })


  }
}

export function saveTransferFields(fields, stripeBankAccountFields) {
  return (dispatch, getState) => {

    new Promise(ful => ful())
      .then(() => {
        if (stripeBankAccountFields) {
          return _getStripeToken(stripeBankAccountFields)
            .then(response => {
              return {external_account: response.id}
            });

        }
        return {}
      })

      .then(externalFields => {
        return apiSaveTransferFields(getToken(), Object.assign({}, fields, externalFields))
      })

      .then(() => {
        dispatch(startTransferringFunds())
      })
      .catch((err) => {

        if (err.param === 'bank_account') {
          dispatch(stripeBankAccountError(err.message))
        }

      });

  }
}

const _getStripeToken = ({
  accountCurrency,
  accountRoutingNumber,
  accountNumber,
  accountHolderName,
  accountHolderType = 'individual'
}) => {

  return new Promise((ful, rej) => {

    Stripe.setPublishableKey(window.stripeKey)

    Stripe.bankAccount.createToken({
      country: 'US',
      currency: accountCurrency,
      routing_number: accountRoutingNumber,
      account_number: accountNumber,
      account_holder_name: accountHolderName,
      account_holder_type: accountHolderType
    }, (status, response) => {
      if (response.error) {
        rej(response.error)
      } else {
        ful(response)
      }
    });

  })

}
