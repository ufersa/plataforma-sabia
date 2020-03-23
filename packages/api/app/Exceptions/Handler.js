const Env = use('Env');
const Youch = use('youch');
const BaseExceptionHandler = use('BaseExceptionHandler');

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
	async handle(error, { request, response }) {
		if (error.name === 'ValidationException') {
			return response.status(error.status).send(error.messages);
		}
		if (Env.get('NODE_ENV') === 'development') {
			const youch = new Youch(error, request.request);
			const errorJSON = await youch.toJSON();

			return response.status(error.status).send(errorJSON);
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
