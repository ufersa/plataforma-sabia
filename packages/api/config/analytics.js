/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
	/*
	|--------------------------------------------------------------------------
	| Analytics Client Email
	|--------------------------------------------------------------------------
	|
	| Defines the Service Account client email for analytics.
	|
	*/
	clientEmail: Env.get('GA_CLIENT_EMAIL'),
	/*
	|--------------------------------------------------------------------------
	| Analytics Private Key
	|--------------------------------------------------------------------------
	|
	| Defines the Path to private key for analytics.
	|
	*/
	privateKey: Env.get('GA_PRIVATE_KEY').replace(/\\n/g, '\n'),
	/*
	|--------------------------------------------------------------------------
	| View Ids
	|--------------------------------------------------------------------------
	|
	| Defines the view ids
	|
	*/
	viewIds: {
		site: Env.get('GA_VIEW_ID_SITE'),
		blog: Env.get('GA_VIEW_ID_BLOG'),
	},
};
