const { ServiceProvider } = require('@adonisjs/fold');
const algoliasearch = require('algoliasearch');

class AlgoliaProvider extends ServiceProvider {
	/**
	 * Register namespaces to the IoC container
	 *
	 * @function register
	 *
	 * @returns {void}
	 */
	register() {
		this.app.singleton('Sabia/AlgoliaSearch', (app) => {
			const Config = app.use('Adonis/Src/Config');
			const { appId, apiKey } = Config.get('algolia');
			return algoliasearch(appId, apiKey);
		});
	}

	/**
	 * Attach context getter when all providers have
	 * been registered
	 *
	 * @function boot
	 *
	 * @returns {void}
	 */
	boot() {
		//
	}
}

module.exports = AlgoliaProvider;
