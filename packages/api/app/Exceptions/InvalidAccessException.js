const { LogicalException } = require('@adonisjs/generic-exceptions');

const message = 'The item is in an status where modifications are disallowed';
const status = 401;
const code = 'E_INVALID_ACCESS';

class InvalidAccessException extends LogicalException {
	/**
	 * Handle this exception by itself
	 */
	// handle () {}
	constructor() {
		super(message, status, code);
	}
}

module.exports = InvalidAccessException;
