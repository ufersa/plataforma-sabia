const { Command } = require('@adonisjs/ace');
const ProgressBar = require('cli-progress');

const Config = use('Adonis/Src/Config');
const Technology = use('App/Models/Technology');
const Database = use('Database');
const algoliasearch = use('App/Services/AlgoliaSearch');

class AlgoliaIndex extends Command {
	static get signature() {
		return `
			algolia:index { --override?: Whether to override the index or not. }
			{ --log?: log the process. }
			{ --settings?: Override index settings. }
		`;
	}

	static get description() {
		return 'Indexes content to algolia.';
	}

	/**
	 * Logs message to the console.
	 *
	 * @param {string} message The message to log.
	 * @param {boolean} show Whether to show the message or not.
	 */
	log(message, show = false) {
		if (show) {
			this.info(message);
		}
	}

	/**
	 * Indexes all data to algolia.
	 *
	 * @param {object} indexObject The algolia index object.
	 */
	async index(indexObject) {
		const count = await Technology.getCount();

		const progressBar = new ProgressBar.SingleBar({});
		progressBar.start(count, 0);
		let page = 0;
		let lastPage;
		do {
			page += 1;
			// eslint-disable-next-line no-await-in-loop
			const techonologies = await Technology.query().paginate(page);
			const { pages } = techonologies;
			const { data } = techonologies.toJSON();
			// eslint-disable-next-line no-await-in-loop
			await indexObject.saveObjects(data);
			progressBar.increment(pages.perPage);
			lastPage = pages.lastPage;
		} while (page <= lastPage);

		progressBar.stop();
	}

	/**
	 * Pushes index settings
	 *
	 * @see https://www.algolia.com/doc/api-reference/settings-api-parameters/
	 * @param {object} indexObject The algolia index object.
	 * @param {Array} replicas The algolia index replicas.
	 * @param {Array} attributesForFaceting The list of attributes that will be used for faceting/filtering.
	 */
	async pushSettings(indexObject, replicas, attributesForFaceting) {
		indexObject.setSettings({
			searchableAttributes: ['title', 'description', 'category', 'place', 'region'],
			replicas,
			attributesForFaceting,
		});
	}

	/**
	 * Handles the command.
	 *
	 * @param {object} args The arguments.
	 * @param {object} options Options passed.
	 * @param {boolean} options.log Whether to log the indexing process.
	 * @param {boolean} options.override Whether to override the exiting index or not.
	 * @param {boolean} options.settings Push index settings.
	 */
	async handle(args, { log, override, settings }) {
		this.info('Starting indexing process');
		const { indexName } = Config.get('algolia');

		this.log('Verbose mode enabled', log);
		this.log(`Using "${indexName}"`, log);

		const indexObject = algoliasearch.initIndex(indexName);

		const overrideIndex =
			override || (await this.confirm(`Do you want to override the ${indexName} index`));

		if (overrideIndex) {
			this.log('Clearing all objects from indice', log);
			indexObject.clearObjects();
		}

		await this.index(indexObject);

		// Change the attributes for faceting/filtering if needed
		const attributesForFaceting = [
			'searchable(region)',
			'searchable(category)',
			'searchable(private)',
		];

		// Change the replicas if needed
		const replicas = [
			{
				name: `${indexName}_price_asc`,
				column: 'price',
				strategy: 'asc',
				attributesForFaceting,
			},
			{
				name: `${indexName}_price_desc`,
				column: 'price',
				strategy: 'desc',
				attributesForFaceting,
			},
		];

		replicas.forEach(async (replica) => {
			await this.createReplica(replica);
		});

		const pushSettings = settings || (await this.confirm(`Do you want to push index settings`));
		if (pushSettings) {
			this.log('Pushing index settings', log);
			this.pushSettings(
				indexObject,
				replicas.map((replica) => replica.name),
				attributesForFaceting,
			);
		}

		this.info('Indexing completed');

		Database.close();
	}

	/**
	 * Creates an index replica.
	 *
	 * @param {object} options Provided options.
	 * @param {string} options.name The replica name.
	 * @param {string} options.column The column to be used to create the replica index.
	 * @param {string} options.strategy Whether the column should be ascendent or descendent.
	 */
	async createReplica({ name, column, strategy, attributesForFaceting }) {
		const replicaIndex = algoliasearch.initIndex(name);

		await replicaIndex.setSettings({
			ranking: [
				`${strategy}(${column})`,
				'typo',
				'geo',
				'words',
				'filters',
				'proximity',
				'attribute',
				'exact',
				'custom',
			],
			attributesForFaceting,
		});
		this.info(`${name} replica indexed`);
	}
}

module.exports = AlgoliaIndex;
