module.exports.register = (db, username, credential) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('user');
			let checkUsernameExisted = await col.findOne({ username: username });
			if(checkUsernameExisted === null){
				let result = await col.insertOne(credential);
				if(result.insertedCount){
					return resolve(true);
				}
			}
			
			return resolve(false);
		}catch(err){
			return reject(err);
		}
	})
}

module.exports.verifiedAuth = (db, credential) => {
	return new Promise(async (resolve, reject) => {
		try{
			let col = db.collection('user');
			let result = await col.findOne(credential, { projection : { _id: 1 }})
			
			return resolve(result);
		}catch(err){
			return reject(err);
		}
	})
}