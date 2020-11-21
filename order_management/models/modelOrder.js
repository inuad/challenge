module.exports.getProductPrice = (db, productId) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('product');
			let result = await col.findOne({ _id: productId }, { projection: { price: 1 }});	
			return resolve(result);
		}catch(err){
			return reject(err);
		}
	})
}

module.exports.checkout = (db, order) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('order');
			let result = await col.insertOne(order);		
			return resolve(result.insertedId);
		}catch(err){
			return reject(err);
		}
	})
}

module.exports.cancel = (db, userId, orderId) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('order');
			let result = await col.updateOne({ _id: orderId, user_id: userId }, { $set : { order_status: 0 }});		
			if(result.modifiedCount){
				return resolve(true);
			}
			return resolve(false);
		}catch(err){
			return reject(err);
		}
	})
}

module.exports.orderDetail = (db, userId, orderId) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('order');
			let result = await col.findOne({ _id: orderId, user_id: userId });
			return resolve(result);
		}catch(err){
			return reject(err);
		}
	})
}