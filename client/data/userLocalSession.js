import LocalStorageKeys from 'client/constants/LocalStorageKeys'

const storage = window.localStorage;

export function hasSession() {
  return storage.getItem(LocalStorageKeys.bbAccessToken) ? true : false;
}

export function setToken(token) {
  storage.setItem(LocalStorageKeys.bbAccessToken, token)
}

export const getToken = () => storage.getItem(LocalStorageKeys.bbAccessToken)

export function clearSession() {
  storage.removeItem(LocalStorageKeys.bbAccessToken);
  storage.removeItem(LocalStorageKeys.fbUser);
}

export function isFbSession() {
  return storage.getItem(LocalStorageKeys.fbUser);
}

export function setFb() {

  storage.setItem(LocalStorageKeys.fbUser, true)

}
