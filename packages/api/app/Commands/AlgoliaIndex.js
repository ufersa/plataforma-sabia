/* eslint-disable no-await-in-loop */
const Database = use('Database');
const Technology = use('App/Models/Technology');
const Idea = use('App/Models/Idea');
const Service = use('App/Models/Service');
const Announcement = use('App/Models/Announcement');
const { Command } = require('@adonisjs/ace');
const ProgressBar = require('cli-progress');
const https = require('https');
const { Algolia } = require('../Utils');

class AlgoliaIndex extends Command {
	constructor() {
		super();
		this.algoliaTechnologies = Algolia.initIndex('technology.indexName');
		this.algoliaServices = Algolia.initIndex('service.indexName');
		this.algoliaAnnouncements = Algolia.initIndex('announcement.indexName');
	}

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
	 */
	async index() {
		const progressBar = new ProgressBar.SingleBar({});
		let page = 0;
		let lastPage;

		// Count
		const count = (
			await Promise.all([
				Technology.query()
					.available()
					.getCount(),
				Idea.getCount(),
				Service.getCount(),
				Announcement.query()
					.published()
					.getCount(),
			])
		).reduce((acc, item) => acc + item, 0);

		progressBar.start(count, 0);

		// Index Technologies
		page = 0;
		do {
			page += 1;
			const technologies = await Technology.query()
				.available()
				.with('terms.taxonomy')
				.with('users.role')
				.with('users.institution')
				.with('thumbnail')
				.with('keywords')
				.with('technologyCosts.costs')
				.paginate(page);
			const { pages } = technologies;
			const { data } = technologies.toJSON();

			if (data.length) {
				await Algolia.saveIndex('technology', data, { saveMany: true });
			}

			progressBar.increment(data.length);
			({ lastPage } = pages);
		} while (page <= lastPage);

		// Index Ideas
		page = 0;
		do {
			page += 1;
			const ideas = await Idea.query()
				.with('keywords')
				.paginate(page);
			const { pages } = ideas;
			const { data } = ideas.toJSON();

			if (data.length) {
				await Algolia.saveIndex('idea', data, { saveMany: true });
			}

			progressBar.increment(data.length);
			({ lastPage } = pages);
		} while (page <= lastPage);

		// Index Services
		page = 0;
		do {
			page += 1;
			const services = await Service.query()
				.with('keywords')
				.with('user.institution')
				.paginate(page);
			const { pages } = services;
			const { data } = services.toJSON();

			if (data.length) {
				await Algolia.saveIndex('service', data, { saveMany: true });
			}

			progressBar.increment(data.length);
			({ lastPage } = pages);
		} while (page <= lastPage);

		// Index Announcement
		page = 0;
		do {
			page += 1;
			const announcements = await Announcement.query()
				.published()
				.with('keywords')
				.with('institution')
				.with('targetAudiences')
				.paginate(page);
			const { pages } = announcements;
			const { data } = announcements.toJSON();

			if (data.length) {
				await Algolia.saveIndex('announcement', data, { saveMany: true });
			}

			progressBar.increment(data.length);
			({ lastPage } = pages);
		} while (page <= lastPage);

		progressBar.stop();
	}

	/**
	 * Pushes index settings
	 *
	 * @see https://www.algolia.com/doc/api-reference/settings-api-parameters/
	 * @param {object} algolia The algolia object
	 * @param {Array} replicas The algolia index replicas.
	 * @param {Array} searchableAttributes The searchable attributes
	 * @param {Array} attributesForFaceting The list of attributes that will be used for faceting/filtering.
	 */
	async pushSettings(algolia, replicas, searchableAttributes, attributesForFaceting) {
		algolia.setSettings({
			searchableAttributes,
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

		const { indexName } = Algolia.config.indexes.technology;

		this.log('Verbose mode enabled', log);
		this.log(`Using "${indexName}"`, log);

		const overrideIndex =
			override || (await this.confirm(`Do you want to override the ${indexName} index`));

		if (overrideIndex) {
			this.log('Clearing all objects from indice', log);
			this.algoliaTechnologies.clearObjects();
			this.algoliaServices.clearObjects();
			this.algoliaAnnouncements.clearObjects();
		}

		await this.index();

		// Change the attributes for faceting/filtering if needed
		const attributesForFacetingTechnologies = [
			'searchable(classification)',
			'searchable(dimension)',
			'searchable(targetAudience)',
			'searchable(type)',
			'searchable(forSale)',
			'searchable(institution)',
			'searchable(keywords)',
		];

		const attributesForFacetingServices = [
			'searchable(type)',
			'searchable(institution)',
			'searchable(keywords)',
		];

		// Change the replicas if needed
		const replicas = [
			{
				name: `${indexName}_installation_time_asc`,
				column: 'installation_time',
				strategy: 'asc',
				attributesForFacetingTechnologies,
			},
			{
				name: `${indexName}_installation_time_desc`,
				column: 'installation_time',
				strategy: 'desc',
				attributesForFacetingTechnologies,
			},
		];

		replicas.forEach(async (replica) => {
			await this.createReplica(replica);
		});

		const pushSettings = settings || (await this.confirm(`Do you want to push index settings`));
		if (pushSettings) {
			this.info('Pushing index settings');
			// Technology
			this.pushSettings(
				this.algoliaTechnologies,
				replicas.map((replica) => replica.name),
				[
					'title',
					'description',
					'classification',
					'dimension',
					'targetAudience',
					'type',
					'forSale',
					'institution',
					'keywords',
				],
				attributesForFacetingTechnologies,
			);
			// Services
			this.pushSettings(
				this.algoliaServices,
				null,
				['name', 'type', 'institution', 'keywords'],
				attributesForFacetingServices,
			);
		}

		this.info('Indexing completed');

		await this.createQuerySuggestions();

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
		const replicaIndex = Algolia.initIndex(name);

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

	/**
	 * Creates query suggestions configuration
	 *
	 * @see https://www.algolia.com/doc/rest-api/query-suggestions
	 * @returns {void}
	 */
	async createQuerySuggestions() {
		this.info('Creating query suggestions');
		const {
			appId,
			apiKey,
			indexes: {
				technology: {
					indexName: technologyIndexName,
					querySuggestions: technologyQuerySuggestions,
				},
				service: { indexName: serviceIndexName, querySuggestions: serviceQuerySuggestions },
			},
		} = Algolia.config;

		const algoliaQuerySuggestionIndexes = [
			{
				sourceIndex: technologyIndexName,
				indexName: technologyQuerySuggestions,
				generate: [
					['classification'],
					['dimension'],
					['targetAudience'],
					['type'],
					['keywords'],
				],
			},
			{
				sourceIndex: serviceIndexName,
				indexName: serviceQuerySuggestions,
				generate: [['type'], ['keywords']],
			},
		];

		for (const { sourceIndex, indexName, generate } of algoliaQuerySuggestionIndexes) {
			const requestData = {
				indexName,
				sourceIndices: [
					{
						indexName: sourceIndex,
						minHits: 1,
						generate,
					},
				],
			};

			const isQuerySuggestionsCreated = await this.isQuerySuggestionsCreated(
				requestData.indexName,
			);

			const request = https.request(
				{
					method: isQuerySuggestionsCreated ? 'PUT' : 'POST',
					host: 'query-suggestions.us.algolia.com',
					path: `/1/configs${
						isQuerySuggestionsCreated ? `/${requestData.indexName}` : ''
					}`,
					headers: {
						'X-Algolia-Application-Id': appId,
						'X-Algolia-API-Key': apiKey,
					},
				},
				(res) => {
					this.warn(`[Algolia API Status Code]: ${res.statusCode}`);

					res.on('data', (data) => {
						if (res.statusCode.toString().startsWith('2')) {
							this.success('Query suggestions configuration completed');
						} else {
							this.error(`Something wrong occurred: ${data}`);
						}
					});

					res.on('error', (error) => {
						this.error(`An error occurred: ${error}`);
					});
				},
			);

			request.write(JSON.stringify(requestData));
			request.end();
		}
	}

	/**
	 * Returns if a given query suggestions index exists
	 *
	 * @param {string} indexName The index name
	 * @returns {boolean} True if query suggestions index exists, false otherwise
	 */
	async isQuerySuggestionsCreated(indexName) {
		const { appId, apiKey } = Algolia.config;

		const request = new Promise((resolve, reject) => {
			https
				.request(
					{
						method: 'GET',
						host: 'query-suggestions.us.algolia.com',
						path: `/1/configs/${indexName}`,
						headers: {
							'X-Algolia-Application-Id': appId,
							'X-Algolia-API-Key': apiKey,
						},
					},
					(res) => {
						res.setEncoding('utf8');
						let dataChunk;

						res.on('data', (data) => {
							dataChunk = data;
						});

						res.on('end', () => {
							resolve(JSON.parse(dataChunk));
						});

						res.on('error', (error) => {
							reject(error);
						});
					},
				)
				.end();
		});

		const response = await request;

		if (response.status === 404) {
			return false;
		}

		return true;
	}
}

module.exports = AlgoliaIndex;
