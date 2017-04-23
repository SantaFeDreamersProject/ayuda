import {
  signup as apiSignup,
  signupFb as apiSignupFb,
  signupStripe as apiSignupStripe,
  activate as apiActivate
} from 'client/data/user'

import {
  createCampaign as apiCreateCampaign,
} from 'client/data/campaign'

import {
  goToCampaign
} from 'client/actions/campaign'

import { browserHistory } from 'react-router'
import { setToken, getToken } from 'client/data/userLocalSession'

export function setCampaignGoal(target, reason) {
  return dispatch => {
    dispatch({ target, reason, type: 'SET_CAMPAIGN_GOAL' });
    browserHistory.push("/login/options")
  };
}

export function createCampaignSuccess(campaign) {
  return dispatch => {
    dispatch({campaign, type: 'CAMPAIGN_CREATE_SUCCESS' });
    goToCampaign()
  };
}

export function createCampaignFailure(error) {
  return dispatch => {
    dispatch({ error, type: 'CAMPAIGN_CREATE_FAILURE' });
  };
}

export function signupError(error) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({ error, type: 'SIGNUP_FAILED' });
  };
}

export function setPhotoError(error) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({ error, type: 'SIGNUP_PHOTO_FAILED' });
  };
}

export function setPhotoSuccess(profilePic) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({profilePic, type: 'SIGNUP_PHOTO_SUCCESS' });
  };
}

export function activateError(error) {
  return dispatch => {
    dispatch({ error, type: 'ACTIVATE_FAILED' });
  };
}

export function activateSuccess() {
  return dispatch => {
    dispatch({ type: 'ACTIVATE_SUCCESS' });
  };
}

export function signupStripeError(error) {
  return dispatch => {
    dispatch({type: 'LOADING_STOPPED' });
    dispatch({ error, type: 'SIGNUP_STRIPE_FAILED' });
  };
}

export function activate(token) {
  return dispatch => {
    apiActivate(token)
      .then(() => {
        dispatch(activateSuccess())
      })
      .catch(() => {
        dispatch(activateFailure())
      })
  }
}

export function agreeStripe() {
  return (dispatch, getState) => {
    let {user} = getState();

    apiActivate(token)
      .then(() => {
        dispatch(activateSuccess())
      })
      .catch(() => {
        dispatch(activateFailure())
      })
  }
}

/*
 * Should add the route like parameter in this method
*/
export function signupSuccess(user) {
  return dispatch => {

    let token = user.token;
    setToken(token);

    browserHistory.push('/signup/photo')

    dispatch({user, type: 'SIGNUP_SUCCESS' });
    dispatch({type: 'LOADING_STOPPED' });

  };
}

const _afterSignup = (promise, dispatch, getState) => {
  promise
    .then(user => {
      dispatch(signupSuccess(user));

      let {campaignNew} = getState();
      if (!campaignNew) return;

      let {reason, target} = campaignNew;

      return apiCreateCampaign({
        userId: user.userId,
        name: reason,
        amount: target})
          .then(campaign => dispatch(createCampaignSuccess(campaign)))
          .catch(err => createCampaignFailure(error))

    })
    .catch(error => { dispatch(signupError(error)) });

}

export function signup(userData) {
  return (dispatch, getState) => {

    dispatch({type: 'LOADING_STARTED' });
    return _afterSignup(
      apiSignup(userData),
      dispatch,
      getState)

  }

}


export function signupFb(userData) {

  return (dispatch, getState) => {

    dispatch({type: 'LOADING_STARTED' });

    return _afterSignup(
      apiSignupFb(userData),
      dispatch,
      getState)
  }

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

export function signupStripe() {

  return (dispatch, getState) => {

    dispatch({type: 'LOADING_STARTED' });

    let {user} = getState();

    apiSignupStripe(user.userId, getToken())
      .then((res) => {
        dispatch(goToCampaign())
        dispatch({type: 'LOADING_STOPPED' });
      })
      .catch(error => { dispatch(signupStripeError(error)) });
  }

}
