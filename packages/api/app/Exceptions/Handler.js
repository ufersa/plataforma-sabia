const BaseExceptionHandler = use('BaseExceptionHandler');
const { antl, errors, errorPayload } = require('../Utils');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
	/**
	 * Handle exception thrown during the HTTP lifecycle
	 *
	 * @function handle
	 *
	 * @param  {object} error - The error object
	 * @param  {object} options - The request and response objects
	 *
	 * @returns {void}
	 */
	async handle(error, { response }) {
		if (error.name === 'ValidationException') {
			return response
				.status(error.status)
				.send(errorPayload(errors.VALIDATION_ERROR, error.messages));
		}

		if (error.code === 'E_USER_NOT_FOUND' || error.code === 'E_PASSWORD_MISMATCH') {
			return response
				.status(error.status)
				.send(
					errorPayload(errors.INVALID_CREDENTIALS, antl('error.auth.invalidCredentials')),
				);
		}

		if (error.code === 'E_ROW_NOT_FOUND') {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_NOT_FOUND,
						antl('error.resource.resourceNotFound'),
					),
				);
		}

		return response.status(error.status).send();
	}

	/**
	 * Report exception for logging or debugging.
	 *
	 * @function report
	 *
	 * @param  {object} error
	 * @param  {object} options.request
	 *
	 * @returns {void}
	 */
	// async report(error, { request }) { }
}

module.exports = ExceptionHandler;
