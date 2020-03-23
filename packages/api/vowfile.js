const ace = require('@adonisjs/ace');

module.exports = (cli, runner) => {
	runner.before(async () => {
		use('Adonis/Src/Server').listen(process.env.HOST, process.env.PORT);

		await ace.call('migration:run', {}, { silent: true });
	});

	runner.after(async () => {
		use('Adonis/Src/Server')
			.getInstance()
			.close();

		await ace.call('migration:reset', {}, { silent: true });
	});
};
