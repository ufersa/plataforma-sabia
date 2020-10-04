const { hooks } = require('@adonisjs/ignitor');

const AlgoliaFakeProvider = require('../test/utils/AlgoliaFakeService');

hooks.before.providersRegistered(() => {
	if (process.env.NODE_ENV === 'testing') {
		/*
		|--------------------------------------------------------------------------
		| Add fakes
		|--------------------------------------------------------------------------
		|
		| Fake provider services before instantiation
		|
		*/
		const { ioc } = use('@adonisjs/fold');

		ioc.singletonFake('App/Services/AlgoliaSearch', () => {
			return AlgoliaFakeProvider;
		});
	}
});

hooks.after.providersBooted(() => {
	const Validator = use('Validator');
	const Database = use('Database');

	const existsFn = async (data, field, message, args, get) => {
		const value = get(data, field);
		if (!value) {
			/**
			 * skip validation if value is not defined. `required` rule
			 * should take care of it.
			 */
			return;
		}

		const [table, column] = args;
		const row = await Database.table(table)
			.where(column, value)
			.first();

		if (!row) {
			throw message;
		}
	};

	// eslint-disable-next-line global-require
	const cpf = require('../app/Utils/cpf');
	Validator.extend('exists', existsFn);
	Validator.extend('cpf', cpf);
});
