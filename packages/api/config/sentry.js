const Env = use('Env');

module.exports = {
	/*
	|--------------------------------------------------------------------------
	| API key
	|--------------------------------------------------------------------------
	*/
	dsn: Env.get('SENTRY_DSN'),

	environment: Env.get('SENTRY_ENVIRONMENT', Env.get('APP_ENV')),

	options: {
		captureUnhandledRejections: true,
	},
};
