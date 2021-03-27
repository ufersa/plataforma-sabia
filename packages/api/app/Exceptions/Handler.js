const BaseExceptionHandler = use('BaseExceptionHandler');
const Sentry = use('Sentry');
const Env = use('Env');
const { errors, errorPayload, Slack } = require('../Utils');

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
			return response
				.status(error.status)
				.send(errorPayload(errors.VALIDATION_ERROR, error.messages));
		}

		if (['E_USER_NOT_FOUND', 'E_PASSWORD_MISMATCH'].includes(error.code)) {
			return response
				.status(error.status)
				.send(
					errorPayload(
						errors.INVALID_CREDENTIALS,
						request.antl('error.auth.invalidCredentials'),
					),
				);
		}

		if (['E_ROW_NOT_FOUND', 'E_MISSING_DATABASE_ROW'].includes(error.code)) {
			const model = error.message.split(':')[1].split(' ')[6];
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_NOT_FOUND,
						request.antl(
							'error.resource.resourceNotFound',
							{ resource: model },
							request,
						),
					),
				);
		}

		if (error.code === 'UNAUTHORIZED_ACCESS') {
			return response
				.status(403)
				.send(
					errorPayload(
						errors.UNAUTHORIZED_ACCESS,
						request.antl('error.permission.unauthorizedAccess'),
					),
				);
		}

		if (error.code === 'REGISTRATION_UNCOMPLETED') {
			return response
				.status(403)
				.send(
					errorPayload(
						errors.REGISTRATION_UNCOMPLETED,
						request.antl('error.user.registrationUncompleted'),
					),
				);
		}

		if (error.status === 500) {
			// eslint-disable-next-line no-console
			console.error(error);

			if (process.env.NODE_ENV === 'development') {
				throw error;
			}
		}

		return response.status(error.status).send();
	}

	async report(error, { request }) {
		if (Env.get('APP_ENV') === 'production') {
			const eventId = await Sentry.captureException(error);
			await Slack.notifyError(error, eventId, request);
		}
	}
}

module.exports = ExceptionHandler;
