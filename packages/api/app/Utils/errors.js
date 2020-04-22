const ERRORS_CODE = {
	INVALID_EMAIL: 'INVALID_EMAIL',
	INVALID_TOKEN: 'INVALID_TOKEN',
	EXPIRED_TOKEN: 'EXPIRED_TOKEN',
};

module.exports.errorPayload = (code, message) => {
	return {
		error_code: code,
		message,
	};
};

module.exports.errors = ERRORS_CODE;
