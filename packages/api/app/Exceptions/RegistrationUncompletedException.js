const { LogicalException } = require('@adonisjs/generic-exceptions');

const message = 'The item is in an status where modifications are disallowed';
const status = 403;
const code = 'REGISTRATION_UNCOMPLETED';

class RegistrationUncompletedException extends LogicalException {
	constructor() {
		super(message, status, code);
	}
}

module.exports = RegistrationUncompletedException;
