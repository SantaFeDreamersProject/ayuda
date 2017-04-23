
const fbIsLoaded = () => typeof FB !== 'undefined';

export function resolveFBHandle() {
  return new Promise((ful, rej) => {
    if (fbIsLoaded()) return ful(FB);

    let waitInt = setInterval(() => {
      if (fbIsLoaded()) {
        clearInterval(waitInt);
        ful(FB);
      }
    }, 500)
  })
}

export function getLoginStatus() {

  return resolveFBHandle()
    .then($fb => {
      return new Promise((ful, rej) => {
        $fb.getLoginStatus((response) => {
          ful(response)
        });
      })
    })

}

export function login() {
  return resolveFBHandle()
    .then($fb => {
      return new Promise((ful, rej) => {
        $fb.login(function(response) {
          if (response.status === 'connected') {
            ful(response);
          } else {
            rej();
          }
        }, {scope: 'email,public_profile'});
      });
    })
}


export function connect() {
  return getLoginStatus()
    .then(response => {
      if (response.status === 'connected') {
        return response;
      }
      return login();
    })

}
