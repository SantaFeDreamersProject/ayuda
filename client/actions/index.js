
export const signup = (name, username, password) => {
  return {
    type: 'SIGNUP',
    name,
    username,
    password
  }
}
