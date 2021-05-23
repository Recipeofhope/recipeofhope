export default (to, from, next) => {
  if (localStorage.getItem('token') !== null && localStorage.getItem('token').length > 0) {
    if (localStorage.getItem('role') !== null && (localStorage.getItem('role') === 'Admin')) {
      next()
    } else {
      next('/')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  } else {
    next('/')
  }
}