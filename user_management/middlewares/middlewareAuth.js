const jwt = require('../modules/moduleJWT');
const responseObjClass = require('../modules/responseObj');

module.exports = async (req, res, next) => {
	let responseObj = new responseObjClass();
	let serviceName = 'Authentication middleware';
	let response;

	let token = req.headers.token ?? null;
	let verifiedToken = await jwt.decodeJWT(token);
	if(token === null || verifiedToken === false){
		response = responseObj.setResponse(`${serviceName}`, 400, 'Authentication Failed', false, null);
		return res.status(400).send(response);
	}

	return next();
};