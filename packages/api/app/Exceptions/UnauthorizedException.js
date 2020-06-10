const { LogicalException } = require('@adonisjs/generic-exceptions');

const message = 'The item is in an status where modifications are disallowed';
const status = 403;
const code = 'UNAUTHORIZED_ACCESS';

class UnauthorizedException extends LogicalException {
	/**
	 * Handle this exception by itself
	 */
	// handle () {}
	constructor() {
		super(message, status, code);
	}
}

module.exports = UnauthorizedException;
