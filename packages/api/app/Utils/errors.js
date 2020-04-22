const ERRORS_CODE = {
	INVALID_EMAIL: 'INVALID_EMAIL',
	INVALID_TOKEN: 'INVALID_TOKEN',
	EXPIRED_TOKEN: 'EXPIRED_TOKEN',
	RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
};

module.exports.errorPayload = (code, message) => {
	return {
		error_code: code,
		message,
	};
};

module.exports.errors = ERRORS_CODE;
