/* All paths which require auth */
const paths = []

var authFilter = async function(req, res, next) {
	const path = req.path;
	
	console.log(`Request received for path : ${path}`);
	
	if (paths.includes(path)) {
		const accessToken = req.headers['x-access-token'];
		
		/* Verify jwt */
		try {
			const user = await getDecodedUser(accessToken);
			
			/* Save user in request for later stages */
			req.user = user;
			
		} catch (error) {
			console.log(`Rejected request for path : ${path}. Authorization failed.`);
		
      		res.status(401).json({ message: error.message });
      		
      		return;
    	}
	}
	
	/* Proceed to next stage in pipeline */
	next();
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


module.exports=authFilter;

