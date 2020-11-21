const responseObjClass = require('../modules/responseObj');
const model = require('../models/modelProduct');

module.exports.getList = async (req, res) => {
	let responseObj = new responseObjClass();
	let serviceName = 'List';
	let response;

	try{
		let db = req['ecDB'];
		let result = await model.productList(db);
		
		response = responseObj.setResponse(`${serviceName}`, 200, "Product List Error", false, null);
		if(result){
			response = responseObj.setResponse(`${serviceName}`, 200, "Product List", true, result);
		}

		return res.status(200).send(response);
	}catch(err){
		console.log(`${err.name} - ${err.message}`);

		response = responseObj.setResponse(`${serviceName}`, 500, null, false, `${err}`);
		return res.status(500).send(response);
	}
}

module.exports.getDetail = async (req, res) => {
	let responseObj = new responseObjClass();
	let serviceName = 'Detail';
	let response;

	try{
		let productId = req.params.id;
		let db = req['ecDB'];
		let result = await model.productDetail(db, productId);
		response = responseObj.setResponse(`${serviceName}`, 200, "Product Detail Error", false, null);
		if(result){
			response = responseObj.setResponse(`${serviceName}`, 200, "Product Detail", true, result);
		}

		return res.status(200).send(response);
	}catch(err){
		console.log(`${err.name} - ${err.message}`);

		response = responseObj.setResponse(`${serviceName}`, 500, null, false, `${err}`);
		return res.status(500).send(response);
	}
}