const { Command } = require('@adonisjs/ace');

const algoliasearch = use('App/AlgoliaSearch');
const Config = use('Adonis/Src/Config');
const Technology = use('App/Models/Technology');
const Database = use('Database');

class AlgoliaIndex extends Command {
	static get signature() {
		return 'algolia:index { --log?: log the process}';
	}

	static get description() {
		return 'Indexes content to algolia.';
	}

	/**
	 * Handles the command.
	 *
	 * @param {object} args The arguments.
	 * @param {object} options Options passed.
	 * @param {boolean} options.log Whether to log the indexing process.
	 */
	async handle(args, { log }) {
		this.info('Starting indexing process');
		const { indexName } = Config.get('algolia');
		if (log) {
			this.info('Verbose mode enabled');
		}

		if (log) {
			this.info(`Using "${indexName}"`);
		}

		const index = algoliasearch.initIndex(indexName);

		// TODO: this is not scalable. needs updating
		const data = await Technology.all();

		await index.replaceAllObjects(data.toJSON());

		this.info('Indexing completed');

		Database.close();
	}
}

module.exports = AlgoliaIndex;
