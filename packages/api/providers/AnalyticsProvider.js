const { ServiceProvider } = require('@adonisjs/fold');
const { google } = require('googleapis');

class AnalyticsProvider extends ServiceProvider {
	/**
	 * Register namespaces to the IoC container
	 *
	 * @function register
	 *
	 * @returns {void}
	 */
	register() {
		this.app.singleton('App/Services/Analytics', () => {
			return google.analytics('v3');
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

module.exports = AnalyticsProvider;
