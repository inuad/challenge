const responseObjClass = require('../modules/responseObj');
const model = require('../models/modelProfile');
const jwt = require('../modules/moduleJWT');

module.exports.getUserProfile = async (req, res) => {
	let responseObj = new responseObjClass();
	let serviceName = 'User Profile';
	let response;

	try{
		let token = (req.headers.token || null) ?? null;
			
		response = responseObj.setResponse(`${serviceName}`, 200, "Get Profile Failed", false, null);
		let verifiedToken = await jwt.decodeJWT(token);
		if(verifiedToken){
			let db = req['ecDB'];
			let result = await model.getUserProfile(db, verifiedToken._id);
			
			if(result){
				response = responseObj.setResponse(`${serviceName}`, 200, "Get Profile Success", true, result);
			}
		}

		return res.status(200).send(response);
	}catch(err){
		console.log(`${err.name} - ${err.message}`);

		response = responseObj.setResponse(`${serviceName}`, 500, null, false, `${err}`);
		return res.status(500).send(response);
	}
}

module.exports.getUserOrderList = async (req, res) => {
	let responseObj = new responseObjClass();
	let serviceName = 'User Order list';
	let response;

	try{
		let token = (req.headers.token || null) ?? null;
		
		response = responseObj.setResponse(`${serviceName}`, 200, "User Order List Error", false, null);
		let verifiedToken = await jwt.decodeJWT(token);
		if(verifiedToken){
			let db = req['ecDB'];
			let result = await model.getUserOrderList(db, verifiedToken._id);
			if(result){
				response = responseObj.setResponse(`${serviceName}`, 200, "User Order List", true, result);
			}
		}

		return res.status(200).send(response);
	}catch(err){
		console.log(`${err.name} - ${err.message}`);

		response = responseObj.setResponse(`${serviceName}`, 500, null, false, `${err}`);
		return res.status(500).send(response);
	}
}