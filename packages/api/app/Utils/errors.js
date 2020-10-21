const ERRORS_CODE = {
	INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
	UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
	VALIDATION_ERROR: 'VALIDATION_ERROR',
	INVALID_EMAIL: 'INVALID_EMAIL',
	UNVERIFIED_EMAIL: 'UNVERIFIED_EMAIL',
	ALREADY_VERIFIED_EMAIL: 'ALREADY_VERIFIED_EMAIL',
	INVALID_TOKEN: 'INVALID_TOKEN',
	EXPIRED_TOKEN: 'EXPIRED_TOKEN',
	MISSING_DEFAULT_ROLE: 'MISSING_DEFAULT_ROLE',
	RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
	RESOURCE_DELETED_ERROR: 'RESOURCE_DELETED_ERROR',
	RESOURCE_SAVING_ERROR: 'RESOURCE_SAVING_ERROR',
	PASSWORD_NOT_MATCH: 'PASSWORD_NOT_MATCH',
	UNIQUE_TECHNOLOGY_COST_ERROR: 'UNIQUE_TECHNOLOGY_COST_ERROR',
	STATUS_NO_ALLOWED_FOR_REVIEW: 'STATUS_NO_ALLOWED_FOR_REVIEW',
};

module.exports.errorPayload = (code, message) => {
	return {
		error: {
			error_code: code,
			message,
		},
	};
};

module.exports.errors = ERRORS_CODE;
