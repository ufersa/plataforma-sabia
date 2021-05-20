const Helpers = use('Helpers');
const Config = use('Adonis/Src/Config');
const { timeout } = use('Test/Runner');
const Redis = use('Redis');
const ace = require('@adonisjs/ace');
const { ioc } = require('@adonisjs/fold');
const fs = require('fs').promises;
const BullMock = require('./test/utils/BullMock');

const { uploadsPath } = Config.get('upload');

ioc.singletonFake('Rocketseat/Bull', () => BullMock);

timeout(20 * 1000); // Set global timeout to 20sec

module.exports = (cli, runner) => {
	runner.before(async () => {
		use('Adonis/Src/Server').listen(process.env.HOST, process.env.PORT);
		await ace.call('migration:run', {}, { silent: true });
		await Promise.all([
			ace.call('seed'),
			fs.mkdir(Helpers.tmpPath('resources/test'), { recursive: true }),
		]);
	});

	runner.after(async () => {
		use('Adonis/Src/Server')
			.getInstance()
			.close();

		await Promise.all([
			ace.call('migration:reset', {}, { silent: true }),
			fs.rmdir(Helpers.publicPath(uploadsPath), { recursive: true }),
			fs.rmdir(Helpers.tmpPath('resources/test'), { recursive: true }),
			Redis.call('flushdb'),
		]);
	});
};
