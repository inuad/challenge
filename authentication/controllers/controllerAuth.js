const responseObjClass = require('../modules/responseObj');
const model = require('../models/modelAuth');
const jwt = require('../modules/moduleJWT');

module.exports.register = async (req, res) => {
	let responseObj = new responseObjClass();
	let serviceName = 'Register';
	let response;

	try{
		let username = (req.body.username || null) ?? null;
		let password = (req.body.password || null) ?? null;
		let name = (req.body.name || null) ?? null;
		let phone = (req.body.phone || null) ?? null;

		if(username === null ||
			password === null ||
			name === null ||
			phone === null) {
			
			console.log('username', username);
			console.log('password', password);
			console.log('name', name);
			console.log('phone', phone);
			response = responseObj.setResponse(`${serviceName}`, 400, `Parameter not found`, false, null);
			return res.status(400).send(response);
		}
		
		let credential = {
			username: username,
			password: password,
			name: name,
			phone: phone,
			created_at: new Date()
		}
		let db = req['ecDB'];
		let result = await model.register(db, username, credential);
		
		response = responseObj.setResponse(`${serviceName}`, 200, "Register Failed", false, null);
		if(result){
			response = responseObj.setResponse(`${serviceName}`, 200, "Register Success", true, null);
		}

		return res.status(200).send(response);
	}catch(err){
		console.log(`${err.name} - ${err.message}`);

		response = responseObj.setResponse(`${serviceName}`, 500, null, false, `${err}`);
		return res.status(500).send(response);
	}
}

module.exports.login = async (req, res) => {
	let responseObj = new responseObjClass();
	let serviceName = 'login';
	let response;

	try{
		let username = (req.body.username || null) ?? null;
		let password = (req.body.password || null) ?? null;
		
		if(username === null || password === null){
			response = responseObj.setResponse(`${serviceName}`, 400, `Parameter not found`, false, null);
			return res.status(400).send(response);
		}
		
		let credential = {
			username: username,
			password: password
		}
		let db = req['ecDB'];
		let result = await model.verifiedAuth(db, credential);

		response = responseObj.setResponse(`${serviceName}`, 200, "Login Failed", false, null);
		if(result !== null){
			const token = jwt.signJWT(result);
			response = responseObj.setResponse(`${serviceName}`, 200, "Login Success", true, {
				token: token
			});
		}
		return res.status(200).send(response);
	}catch(err){
		console.log(`${err.name} - ${err.message}`);

		response = responseObj.setResponse(`${serviceName}`, 500, null, false, `${err}`);
		return res.status(500).send(response);
	}
}