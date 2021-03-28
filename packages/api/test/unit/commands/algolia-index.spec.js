/* eslint-disable */
const { before, after, test } = use('Test/Suite')('AlgoliaIndex');
const Database = use('Database');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const sinon = require('sinon');
const { ioc } = require('@adonisjs/fold');
const https = require('https');

const AlgoliaIndex = require('../../../app/Commands/AlgoliaIndex');

/**
 * Total number of all indexes started during the command execution.
 * Eg: technology, ideas, services, etc
 */
const TOTAL_INDEXES = 4;

before(async () => {
	const sandbox = sinon.createSandbox();

	const modelMethods = {
		query() {},
		getCount() {},
	};

	ioc.fake('https', () => sandbox.spy({ request() {} }));

	ioc.fake('App/Models/Technology', () => ({ ...modelMethods, available() {} }));

	ioc.fake('App/Models/Idea', () => ({ ...modelMethods }));
	ioc.fake('App/Models/Service', () => ({ ...modelMethods }));
	ioc.fake('App/Models/Announcement', () => ({ ...modelMethods, published() {} }));

	ioc.fake('Database', () => sandbox.spy({ close() {} }));
});

after(async () => {
	ioc.restore('App/Models/Technology');
	ioc.restore('App/Models/Idea');
	ioc.restore('App/Models/Service');
	ioc.restore('App/Models/Announcement');
});

const sut = async () => {
	const instance = new AlgoliaIndex();
	return instance.handle(null, {
		log: false,
		override: true,
		settings: true,
	});
};

test('', async ({ assert }) => {
	const result = await sut();

	assert.equal(AlgoliaSearch.initIndex.callCount, TOTAL_INDEXES);
	assert.equal(AlgoliaSearch.initIndex().clearObjects.callCount, TOTAL_INDEXES);

	assert.ok(result.oi);
	assert.ok(https.request.isCalled);
	// assert.ok(Database.close().isCalled);
});
