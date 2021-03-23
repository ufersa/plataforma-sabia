// const ace = require('@adonisjs/ace');
const { ioc } = require('@adonisjs/fold');
const fs = require('fs').promises;
const BullMock = require('./test/utils/BullMock');

const Helpers = use('Helpers');
const Config = use('Adonis/Src/Config');
const { timeout } = use('Test/Runner');

const { uploadsPath } = Config.get('upload');

ioc.singletonFake('Rocketseat/Bull', () => BullMock);

timeout(20 * 1000); // Set global timeout to 20sec

module.exports = (cli, runner) => {
	runner.before(async () => {
		/*
		|--------------------------------------------------------------------------
		| Start the server
		|--------------------------------------------------------------------------
		|
		| Starts the http server before running the tests. You can comment this
		| line, if http server is not required
		|
		*/
		use('Adonis/Src/Server').listen(process.env.HOST, process.env.PORT);

		/*
		|--------------------------------------------------------------------------
		| Run migrations
		|--------------------------------------------------------------------------
		|
		| Run all migrations.
		|
		*/
		// await ace.call('migration:run', {}, { silent: true });
		// await ace.call('seed');
		await fs.mkdir(Helpers.tmpPath('resources/test'), { recursive: true });
	});

	runner.after(async () => {
		use('Adonis/Src/Server')
			.getInstance()
			.close();

		// await ace.call('migration:reset', {}, { silent: true });
		await fs.rmdir(Helpers.publicPath(uploadsPath), { recursive: true });
		await fs.rmdir(Helpers.tmpPath('resources/test'), { recursive: true });
	});
};
