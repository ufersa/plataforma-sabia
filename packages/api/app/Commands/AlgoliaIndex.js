const { Command } = require('@adonisjs/ace');

const AlgoliaSearch = use('Sabia/AlgoliaSearch');
const Config = use('Adonis/Src/Config');

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

		console.log(AlgoliaSearch);
	}
}

module.exports = AlgoliaIndex;
