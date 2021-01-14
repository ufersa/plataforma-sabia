/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
	/*
	|--------------------------------------------------------------------------
	| Algolia Application ID
	|--------------------------------------------------------------------------
	|
	| Defines the Algolia Application Id.
	|
	*/
	appId: Env.get('ALGOLIA_APP_ID'),

	/*
	|--------------------------------------------------------------------------
	| Algolia Admin Key
	|--------------------------------------------------------------------------
	|
	| Defines the Algolia Admin Key, this is used to have admin access to the algolia service
	| and manage indices and data through the algolia client.
	|
	*/
	apiKey: Env.get('ALGOLIA_ADMIN_KEY'),

	/*
	|--------------------------------------------------------------------------
	| Index Name
	|--------------------------------------------------------------------------
	|
	| Which indice index the content to.
	|
	*/
	indexName: Env.get('ALGOLIA_INDEX_NAME'),

	indexes: {
		technology: `${Env.get('ALGOLIA_INDEX_PREFIX')}_technology`,
		idea: `${Env.get('ALGOLIA_INDEX_PREFIX')}_ideas`,
	},
};
