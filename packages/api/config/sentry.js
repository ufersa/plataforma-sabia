const Env = use('Env');

module.exports = {
	/*
   |--------------------------------------------------------------------------
   | API key
   |--------------------------------------------------------------------------
   */
	dsn: Env.get(
		'SENTRY_DSN',
		'https://e7836d48c6dc49a48da700b59241f1cc@o302563.ingest.sentry.io/5691432',
	),

	environment: Env.get('SENTRY_ENVIRONMENT', Env.get('APP_ENV')),

	options: {
		// captureUnhandledRejections: true
	},
};
