const responseObjClass = require('../modules/responseObj');
const model = require('../models/modelOrder');
const jwt = require('../modules/moduleJWT');
let ObjectID = require('mongodb').ObjectID;

module.exports.orderCheckout = async (req, res) => {
	let responseObj = new responseObjClass();
	let serviceName = 'Checkout';
	let response;

	try{
		let token = (req.headers.token || null) ?? null;
		let order = (req.body.order || null) ?? null;

		if(order === null) {
			response = responseObj.setResponse(`${serviceName}`, 400, `Parameter not found`, false, null);
			return res.status(400).send(response);
		}
		
		response = responseObj.setResponse(`${serviceName}`, 200, "Order Checkout Error", false, null);		
		let verifiedToken = await jwt.decodeJWT(token);
		if(verifiedToken){
			let db = req['ecDB'];

			let prodcutTotal = 0;
			let prodcutTotalPrice = 0;

			for(let p of order){
				let productPrice = await model.getProductPrice(db, new ObjectID(p._id));
				prodcutTotal += p.amount;
				prodcutTotalPrice += (productPrice.price * p.amount);
			}
			let orderData = {
				user_id: verifiedToken._id,
				product: order,
				product_total: prodcutTotal,
				product_total_price: prodcutTotalPrice,
				order_status: 1,
				created_at: new Date()
			}

			let result = await model.checkout(db, orderData);
			if(result){
				response = responseObj.setResponse(`${serviceName}`, 200, "Order Checkout Success", true, {
					orderId: result
				});
			}
		}

		return res.status(200).send(response);
	}catch(err){
		console.log(`${err.name} - ${err.message}`);

		response = responseObj.setResponse(`${serviceName}`, 500, null, false, `${err}`);
		return res.status(500).send(response);
	}
}

module.exports.orderCancel = async (req, res) => {
	let responseObj = new responseObjClass();
	let serviceName = 'Detail';
	let response;

	try{
		let token = (req.headers.token || null) ?? null;
		let orderId = (req.body.id || null) ?? null;
		
		if(orderId === null) {
			response = responseObj.setResponse(`${serviceName}`, 400, `Parameter not found`, false, null);
			return res.status(400).send(response);
		}

		response = responseObj.setResponse(`${serviceName}`, 200, "Cancel Order Error", false, null);
		let verifiedToken = await jwt.decodeJWT(token);
		if(verifiedToken){
			let db = req['ecDB'];
			let result = await model.cancel(db, verifiedToken._id, new ObjectID(orderId));

			if(result){
				response = responseObj.setResponse(`${serviceName}`, 200, "Cancel Order Success", true, result);
			}
		}

		return res.status(200).send(response);
	}catch(err){
		console.log(`${err.name} - ${err.message}`);

		response = responseObj.setResponse(`${serviceName}`, 500, null, false, `${err}`);
		return res.status(500).send(response);
	}
}

module.exports.orderDetail = async (req, res) => {
	let responseObj = new responseObjClass();
	let serviceName = 'Detail';
	let response;

	try{
		let token = (req.headers.token || null) ?? null;
		let orderId = req.params.id;
		
		if(orderId === null) {
			response = responseObj.setResponse(`${serviceName}`, 400, `Parameter not found`, false, null);
			return res.status(400).send(response);
		}

		response = responseObj.setResponse(`${serviceName}`, 200, "Order Detail Error", false, null);
		let verifiedToken = await jwt.decodeJWT(token);
		if(verifiedToken){
			let db = req['ecDB'];
			let result = await model.orderDetail(db, verifiedToken._id, new ObjectID(orderId));
			if(result){
				response = responseObj.setResponse(`${serviceName}`, 200, "Order Detail", true, result);
			}
		}

		return res.status(200).send(response);
	}catch(err){
		console.log(`${err.name} - ${err.message}`);

		response = responseObj.setResponse(`${serviceName}`, 500, null, false, `${err}`);
		return res.status(500).send(response);
	}
}