const { LogicalException } = require('@adonisjs/generic-exceptions');

class ResourceNotFoundException extends LogicalException {}

module.exports = ResourceNotFoundException;
