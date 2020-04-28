const MESSAGES_CODE = {};

module.exports.generalMessage = (code, message) => {
	return {
		message_code: code,
		message,
	};
};

module.exports.messages = MESSAGES_CODE;
