const { ServiceProvider } = require('@adonisjs/fold');
const { Client } = require('@elastic/elasticsearch');

class ElasticProvider extends ServiceProvider {
	register() {
		// eslint-disable-next-line no-unused-vars
		this.app.singleton('App/Services/ElasticSearch', (app) => {
			// const Config = app.use('Adonis/Src/Config');
			// const config = Config.get('algolia');

			const client = new Client({
				node: 'http://localhost:9200',
				auth: {
					username: 'elastic',
					password: 'changeme',
				},
			});
			return client;
		});

		this.app.alias('App/Services/ElasticSearch', 'ElasticSearch');
	}
}

module.exports = ElasticProvider;
