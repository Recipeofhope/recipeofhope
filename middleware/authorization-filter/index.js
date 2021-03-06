const jwt = require('jsonwebtoken');

/* All paths which require auth */

/* Format -> path:method */
const paths = [
  '/user:DELETE',
  '/user/user-details:GET',
  '/user:PUT',
  '/cook/schedule:PUT',
  '/cook/meals-ready:POST',
  '/patient/get-meals:GET',
  '/patient/booked-meals:GET',
  '/patient/book-meals:PUT',
  '/patient/cancel-meal:POST',
  '/patient/waitlist:POST',
  '/admin/unapproved-cooks:GET',
  '/admin/approve-cooks:PATCH',
  '/admin/waitlist:GET',
];

var authFilter = async function(req, res, next) {
  const path = req.path;
  const method = req.method;

  console.log(`Request received for path : ${path}, method : ${method}`);

  if (requiresAuth(path, method)) {
    const accessToken = req.headers['x-access-token'];

    /* Verify jwt */
    try {
      const user = await getDecodedUser(accessToken);

      /* Save user in request for later stages */
      req.decodedUser = user;
    } catch (error) {
      console.log(`Rejected request for path : ${path}. Authorization failed.`);
      if (error.name === 'TokenExpiredError') {
        res.status(400).json({ message: 'TOKEN_EXPIRED' });
      } else {
        res.status(401).json({ message: error.message });
      }
      return;
    }
  }

  /* Proceed to next stage in pipeline */
  next();
};

function requiresAuth(reqPath, method) {
  for (const path of paths) {
    const meta = path.split(':');

    if (
      reqPath.includes(meta[0]) &&
      meta[1].toUpperCase() == method.toUpperCase()
    ) {
      return true;
    }
  }

  return false;
}

async function getDecodedUser(accessToken) {
  if (!accessToken) {
    throw new Error('Access token not provided.');
  }

  const decodedUser = await jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (!decodedUser.user_type) {
    throw new Error('Invalid payload from access token.');
  }

  return decodedUser;
}

module.exports = authFilter;
