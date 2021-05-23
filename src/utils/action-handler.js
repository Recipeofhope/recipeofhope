export default async function asyncMiddleware(handler, commit, dispatch, id = null, toaster = false) {
  dispatch('start', id, { root: true })
  let res = ''
  try {
    res = await handler()
    dispatch('handleSuccess', { type: id, res, toaster }, { root: true })
  } catch (error) {
    res = error.response.data;
    dispatch('handleError', { type: id, error }, { root: true })
  }
  dispatch('end', id, { root: true })
  return res
}