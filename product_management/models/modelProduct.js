let ObjectID = require('mongodb').ObjectID;

module.exports.productList = (db) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('product');
			let result = await col.find().toArray();		
			return resolve(result);
		}catch(err){
			return reject(err);
		}
	})
}

module.exports.productDetail = (db, id) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('product');
			let result = await col.findOne({ _id: new ObjectID(id)});
			
			return resolve(result);
		}catch(err){
			return reject(err);
		}
	})
}