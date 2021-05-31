export default async function asyncMiddleware(
  handler,
  commit,
  dispatch,
  id = null,
  toaster = false
) {
  dispatch('start', id, { root: true });
  let res = '';
  try {
    res = await handler();
    dispatch('handleSuccess', { type: id, res, toaster }, { root: true });
  } catch (error) {
    if (error.response) {
      res = error.response.data;
    }
    if (res.message === 'jwt expired') {
      // we must get a new access and refresh token, and retry the original call.
    }
    dispatch('handleError', { type: id, error }, { root: true });
  }
  dispatch('end', id, { root: true });
  return res;
}
