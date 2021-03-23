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
		this.algoliaIdeas = Algolia.initIndex('idea.indexName');
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
		const successfullyIntegrated = {
			technology: 0,
			idea: 0,
			service: 0,
			announcement: 0,
		};
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
				successfullyIntegrated.technology += data.length;
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
				successfullyIntegrated.idea += data.length;
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
				successfullyIntegrated.service += data.length;
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
				successfullyIntegrated.announcement += data.length;
			}

			progressBar.increment(data.length);
			({ lastPage } = pages);
		} while (page <= lastPage);

		progressBar.stop();

		// Report integration counter
		this.success('\nEnd of saving indexes');
		this.info('{');
		Object.entries(successfullyIntegrated).forEach(([model, quantity]) => {
			this.info(`  "${model}": ${quantity},`);
		});
		this.info('}');
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
		const { indexes } = Algolia.config;
		this.info('Starting indexing process');
		this.log('Verbose mode enabled', log);
		this.log(`Using "${indexes.technology.indexName}"`, log);

		const overrideIndex =
			override ||
			(await this.confirm(
				`Do you want to override the ${indexes.technology.indexName} index`,
			));

		if (overrideIndex) {
			this.log('Clearing all index objects', log);
			this.algoliaTechnologies.clearObjects();
			this.algoliaServices.clearObjects();
			this.algoliaIdeas.clearObjects();
			this.algoliaAnnouncements.clearObjects();
		}

		await this.index();

		// Change the attributes for faceting/filtering if needed
		const attributesForFaceting = {
			technologies: [
				'searchable(classification)',
				'searchable(dimension)',
				'searchable(targetAudience)',
				'searchable(type)',
				'searchable(forSale)',
				'searchable(institution)',
				'searchable(keywords)',
			],
			services: ['searchable(type)', 'searchable(institution)', 'searchable(keywords)'],
			ideas: ['searchable(keywords)'],
			announcements: ['searchable(keywords)'],
		};

		// Change the replicas if needed
		const replicas = {
			technologies: [
				{
					name: `${indexes.technology.indexName}_installation_time_asc`,
					column: 'installation_time',
					strategy: 'asc',
					attributesForFaceting: attributesForFaceting.technologies,
				},
				{
					name: `${indexes.technology.indexName}_installation_time_desc`,
					column: 'installation_time',
					strategy: 'desc',
					attributesForFaceting: attributesForFaceting.technologies,
				},
			],
			ideas: [
				{
					name: `${indexes.idea.indexName}_created_at_asc`,
					column: 'created_at',
					strategy: 'asc',
					attributesForFaceting: [],
				},
				{
					name: `${indexes.idea.indexName}_created_at_desc`,
					column: 'created_at',
					strategy: 'desc',
					attributesForFaceting: [],
				},
			],
			announcements: [
				{
					name: `${indexes.announcement.indexName}_created_at_asc`,
					column: 'created_at',
					strategy: 'asc',
					attributesForFaceting: [],
				},
				{
					name: `${indexes.announcement.indexName}_created_at_desc`,
					column: 'created_at',
					strategy: 'desc',
					attributesForFaceting: [],
				},
			],
		};

		// Report integration counter
		this.success('\nSaving replica indexes');
		this.info('[');
		for (const indexReplicas of Object.values(replicas)) {
			for (const replica of indexReplicas) {
				await this.createReplica(replica);
				this.info(`  "${replica.name}",`);
			}
		}
		this.info(']');

		const pushSettings = settings || (await this.confirm('Do you want to push index settings'));
		if (pushSettings) {
			this.info('\nPushing index settings');

			const settingsToPush = {
				technology: {
					algolia: this.algoliaTechnologies,
					replicas: replicas.technologies.map((replica) => replica.name),
					searchableAttributes: [
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
					attributesForFaceting: attributesForFaceting.technologies,
				},
				services: {
					algolia: this.algoliaServices,
					replicas: null,
					searchableAttributes: ['name', 'type', 'institution', 'keywords'],
					attributesForFaceting: attributesForFaceting.services,
				},
				ideas: {
					algolia: this.algoliaIdeas,
					replicas: replicas.ideas.map((replica) => replica.name),
					searchableAttributes: ['title', 'description', 'keywords'],
					attributesForFaceting: attributesForFaceting.ideas,
				},
				announcements: {
					algolia: this.algoliaAnnouncements,
					replicas: replicas.announcements.map((replica) => replica.name),
					searchableAttributes: ['title', 'description', 'keywords'],
					attributesForFaceting: attributesForFaceting.announcements,
				},
			};

			for (const setting of Object.values(settingsToPush)) {
				await this.pushSettings(
					setting.algolia,
					setting.replicas,
					setting.searchableAttributes,
					setting.attributesForFaceting,
				);
			}
		}

		this.success('Indexing completed');

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
	 * @param {string[]} options.attributesForFaceting The list of attributes for faceting.
	 */
	async createReplica({ name, column, strategy, attributesForFaceting = [] }) {
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
	}

	/**
	 * Creates query suggestions configuration
	 *
	 * @see https://www.algolia.com/doc/rest-api/query-suggestions
	 * @returns {void}
	 */
	async createQuerySuggestions() {
		this.info('\nCreating query suggestions');
		const { appId, apiKey, indexes } = Algolia.config;

		const algoliaQuerySuggestionIndexes = [
			{
				sourceIndex: indexes.technology.indexName,
				indexName: indexes.technology.querySuggestions,
				generate: [
					['classification'],
					['dimension'],
					['targetAudience'],
					['type'],
					['keywords'],
				],
			},
			{
				sourceIndex: indexes.service.indexName,
				indexName: indexes.service.querySuggestions,
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
					res.on('data', (data) => {
						if (res.statusCode.toString().startsWith('2')) {
							this.success(
								`Query suggestions configuration for ${sourceIndex} completed`,
							);
						} else {
							this.warn(`[Algolia API Status Code]: ${res.statusCode}`);
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
		return response.status !== 404;
	}
}

module.exports = AlgoliaIndex;
