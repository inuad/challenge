class ResponseObjClass {
	constructor(){
		this.serviceName = null;
		this.status = null;
		this.statusCode = null;
		this.message = null;
		this.response = null;
	}

	setResponse(serviceName = null, statusCode = null, message = null, status = null, response = null) {
		this.serviceName = serviceName;
		this.status = status;
		this.statusCode = statusCode;
		this.message = message;
		this.response = response;

		return {
			serviceName : this.serviceName,
			status : this.status,
			statusCode : this.statusCode,
			message : this.message,
			response : this.response,
		}
	}
}
module.exports = ResponseObjClass;
