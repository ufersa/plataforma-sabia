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
		this.algolia = Algolia.initIndex('technology');
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
				.with('thumbnail')
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
	 * @param {Array} replicas The algolia index replicas.
	 * @param {Array} attributesForFaceting The list of attributes that will be used for faceting/filtering.
	 */
	async pushSettings(replicas, attributesForFaceting) {
		this.algolia.setSettings({
			searchableAttributes: [
				'title',
				'description',
				'category',
				'classification',
				'dimension',
				'targetAudience',
				'implementationCost',
				'maintenanceCost',
				'type',
			],
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

		const indexName = Algolia.config.indexes.technology;

		this.log('Verbose mode enabled', log);
		this.log(`Using "${indexName}"`, log);

		const overrideIndex =
			override || (await this.confirm(`Do you want to override the ${indexName} index`));

		if (overrideIndex) {
			this.log('Clearing all objects from indice', log);
			this.algolia.clearObjects();
		}

		await this.index();

		// Change the attributes for faceting/filtering if needed
		const attributesForFaceting = [
			'searchable(category)',
			'searchable(private)',
			'searchable(classification)',
			'searchable(dimension)',
			'searchable(targetAudience)',
			'searchable(implementationCost)',
			'searchable(maintenanceCost)',
			'searchable(type)',
		];

		// Change the replicas if needed
		const replicas = [
			{
				name: `${indexName}_installation_time_asc`,
				column: 'installation_time',
				strategy: 'asc',
				attributesForFaceting,
			},
			{
				name: `${indexName}_installation_time_desc`,
				column: 'installation_time',
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
				replicas.map((replica) => replica.name),
				attributesForFaceting,
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
			indexes: { technology: indexName },
		} = Algolia.config;

		const requestData = {
			indexName: `${indexName}_query_suggestions`,
			sourceIndices: [
				{
					indexName,
					minHits: 1,
					generate: [['category'], ['classification'], ['dimension'], ['targetAudience']],
				},
			],
		};

		const request = https.request(
			{
				method: 'POST',
				host: 'query-suggestions.us.algolia.com',
				path: '/1/configs',
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

module.exports = AlgoliaIndex;
