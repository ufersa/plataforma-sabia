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
	| Index Names
	|--------------------------------------------------------------------------
	|
	| Which indice index the content to.
	|
	*/
	indexes: {
		technology: {
			indexName: `${Env.get('ALGOLIA_INDEX_PREFIX')}_technology_${Env.get('APP_ENV')}`,
			querySuggestions: `${Env.get(
				'ALGOLIA_INDEX_PREFIX',
			)}_technology_query_suggestions_${Env.get('APP_ENV')}`,
		},
		idea: {
			indexName: `${Env.get('ALGOLIA_INDEX_PREFIX')}_ideas_${Env.get('APP_ENV')}`,
			querySuggestions: `${Env.get('ALGOLIA_INDEX_PREFIX')}_ideas_query_suggestions_${Env.get(
				'APP_ENV',
			)}`,
		},
		service: {
			indexName: `${Env.get('ALGOLIA_INDEX_PREFIX')}_services_${Env.get('APP_ENV')}`,
			querySuggestions: `${Env.get(
				'ALGOLIA_INDEX_PREFIX',
			)}_services_query_suggestions_${Env.get('APP_ENV')}`,
		},
		announcement: {
			indexName: `${Env.get('ALGOLIA_INDEX_PREFIX')}_announcements_${Env.get('APP_ENV')}`,
			querySuggestions: `${Env.get(
				'ALGOLIA_INDEX_PREFIX',
			)}_announcements_query_suggestions_${Env.get('APP_ENV')}`,
		},
		institution: {
			indexName: `${Env.get('ALGOLIA_INDEX_PREFIX')}_institutions_${Env.get('APP_ENV')}`,
			querySuggestions: `${Env.get(
				'ALGOLIA_INDEX_PREFIX',
			)}_institutions_query_suggestions_${Env.get('APP_ENV')}`,
		},
	},
};
