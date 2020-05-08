const ace = require('@adonisjs/ace');

const { timeout } = use('Test/Runner');
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
		await ace.call('migration:run', {}, { silent: true });
		await ace.call(
			'seed',
			{ files: 'RoleSeeder.js, TaxonomySeeder.js, TermSeeder.js' },
			{ silent: true },
		);
	});

	runner.after(async () => {
		use('Adonis/Src/Server')
			.getInstance()
			.close();

		await ace.call('migration:reset', {}, { silent: true });
	});
};
