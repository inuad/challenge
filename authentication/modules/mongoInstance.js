const MongoClient = require('mongodb').MongoClient;
const mongoUsername = process.env.MONGODB_USERNAME;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongourl = `mongodb+srv://${mongoUsername}:${mongoPassword}@${process.env.MONGODB_URL}/?retryWrites=true&w=majority`;
const options = {
    useUnifiedTopology: true, 
};

module.exports = (dbname, instanceName) =>  {
	let property = `${instanceName}`;
	let connection;

	return async (req, res, next) => {
		try{
			if (!connection) {
				connection = MongoClient.connect(mongourl, options);
			}
			let con = await connection;
			let db = con.db(dbname);
			req[property] = db;

			return next();
		}catch(err) {
			connection = undefined;
			return next(err);
		};
	};
};

module.exports.connect = async (dbname) =>  {
	try{
		let conn = await MongoClient.connect(mongourl, options);
		return {
			conn: conn,
			dbInstance: conn.db(dbname)
		};
	}catch(err) {
		return err;
	};
}

module.exports.close = async (conn) =>  {
	try{
		await conn.close();
	}catch(err) {
		return err;
	};
}