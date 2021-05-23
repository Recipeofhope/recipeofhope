export default (to, from, next) => {
  if (localStorage.getItem('token') !== null && localStorage.getItem('token').length > 0) {
    // verify with firebase or jwt
    next()
  } else {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    next('/')
  }
}
