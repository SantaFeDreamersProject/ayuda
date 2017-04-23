import {
  login as apiLogin,
  loginFb as apiLoginFb,
  getFbProfile,
  getUserByToken
} from 'client/data/user'

import {
  goToCampaign
} from 'client/actions/campaign'

import { resolveFBHandle } from 'client/lib/fb'
import { browserHistory } from 'react-router'
import {
  hasSession,
  clearSession,
  isFbSession,
  setToken,
  getToken,
  setFb} from 'client/data/userLocalSession'

export function loginError(error) {
  return dispatch => {
    dispatch({ error, type: 'LOGGED_FAILED' });
    dispatch({type: 'LOADING_STOPPED' });
  };
}

export function loginSuccess(user) {
  return dispatch => {

    let token = user.token;
    setToken(token);

    dispatch({ user, type: 'LOGGED_SUCCESSFULLY' });
    dispatch({type: 'LOADING_STOPPED' });
    dispatch(goToCampaign())
  };
}


export function logoutSuccess() {
  return dispatch => {

    browserHistory.push("/")

    dispatch({ type: 'LOGGED_OUT_SUCCESSFULLY' });
    dispatch({ type: 'LOADING_STOPPED' });

  }
}

export function loadUserFromSession() {

  return dispatch => {

    if (!hasSession()) return;

    getUserByToken(getToken())
      .then(user => {
        dispatch({ user, type: 'LOAD_USER_SUCCESSFULLY' });
      })
  }

}

/**
 * Log in a 'native' user
 */
export function login(credentials) {
  return dispatch =>
    {
      dispatch({type: 'LOADING_STARTED' });
      apiLogin(credentials)
      .then(user => {
        dispatch(loginSuccess(user));
      })
      .catch(error => { dispatch(loginError(error)) });
    }

}

/**
 * Log in a fb user using an access token from fb
 */
export function loginFb(accessToken) {
  return dispatch => {

    dispatch({type: 'LOADING_STARTED' });

    apiLoginFb(accessToken)
    .then(user => {
      dispatch(loginSuccess(user));
    })
    .catch(error => {
      dispatch(loginError(error))
     });
  }

}


const loginOrGoToSignupFb = (accessToken) => {

  return dispatch => {

    dispatch({type: 'LOADING_STARTED' });

    apiLoginFb(accessToken)
    .then(user => dispatch(loginSuccess(user)))
    .catch(error => {
      /**
       * Making a (possibly bad) assumption that failure means the user does not exist yet..
       */
        getFbProfile(accessToken)
          .then(fbProfileData => {
            let signupSuggestedValues = {
              suggestedName: `${fbProfileData.firstName} ${fbProfileData.lastName}`,
              suggestedEmail: fbProfileData.email
            }

            dispatch({
              signupSuggestedValues,
              fbToken: accessToken,
              type: 'FB_CONNECTED_SUCCESSFULLY'
            });

            dispatch({type: 'LOADING_STOPPED' });

            browserHistory.push('/signup/facebook');

          }).catch(e => {
            //TODO?
            dispatch({type: 'LOADING_STOPPED' });
          })

     });

  }
}

/**
 * Redirect users that have a session
 */
export function redirectAuthedUsers() {
  return dispatch => {
    if (hasSession()) {
      dispatch(goToCampaign())
    }
  }
}

/**
 * FB Login Check
 *
 * @return Function
 */
export function fbLoginCheck() {

  return dispatch =>
    {
      return resolveFBHandle()//TODO: use lib/fb.getLoginStatus
        .then($fb => {
          return new Promise((ful, rej) => {
            $fb.getLoginStatus((response) => {
              ful(response)
            });
          })
        })
        .then(response => {

          if (response.status === 'connected') {
            return apiLoginFb(response.authResponse.accessToken)
              .then(user => dispatch(loginSuccess(user)))
          }
        })

    }

}

/**
 * FB login
 *
 * @return Function
 */
export function fbConnect() {

  return dispatch => {
    //TODO: use connect() helper from lib/fb
    return resolveFBHandle()
      .then($fb => {

        return new Promise((ful, rej) => {
          $fb.login(function(response) {
            //console.log(response);
            /**
             * If connected, resolve w/ accessToken
             */
            if (response.status === 'connected') {
              setFb();
              ful(response.authResponse.accessToken);
            } else {
              rej();
            }
          }, {scope: 'email,public_profile'});

        });
      })
      .then(accessToken => dispatch(loginOrGoToSignupFb(accessToken)))
      .catch(e => {
        //swallow for now..
      })

  }

}



/**
 * Logout helper
 */
const _logout = dispatch => {

  let isFb = isFbSession();

  clearSession();

  if (!isFb) {
    return Promise.resolve();
  }

  return resolveFBHandle()
    .then($fb => {
      $fb.logout(function(response) {

        ful();

      });
    })
}

/**
 * Log the user out and redirect
 *
 * @return {[type]} [description]
 */
export function logout() {
  return dispatch => {

    _logout()
      .then(() => dispatch(logoutSuccess()))

  }
}
