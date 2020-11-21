let ObjectID = require('mongodb').ObjectID;

module.exports.getUserProfile = (db, id) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('user');
			let result = await col.findOne({ _id: new ObjectID(id) }, { projection: { _id: 0, password: 0 }});
			if(result !== null){
				return resolve(result)
			}
			
			return resolve(false);
		}catch(err){
			return reject(err);
		}
	})
}

module.exports.getUserOrderList = (db, id) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('order');
			let result = await col.find({ user_id: id , order_status: 1 }).toArray();
			return resolve(result)
		}catch(err){
			return reject(err);
		}
	})
}