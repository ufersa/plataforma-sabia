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

	const repeated = [
		'11111111111',
		'22222222222',
		'33333333333',
		'44444444444',
		'55555555555',
		'66666666666',
		'77777777777',
		'88888888888',
		'99999999999',
	];

	const cpfFn = async (data, field, message, args, get) => {
		const value = get(data, field);

		if (!value) {
			// required rule should take care
			return;
		}

		if (!/^[\d-.]+$/.test(value)) {
			// accepts only digits, - and .
			throw message || `invalid cpf (${value}).`;
		}

		const sanitizedValue = value.replace(/[^\d]/g, '');

		if (!/\d{11}/.test(sanitizedValue)) {
			// not a number and not enough digits
			throw message ||
				`invalid cpf field lenght (${sanitizedValue.lenght}). expected 11 digits.`;
		}

		if (sanitizedValue.length !== 11) {
			throw message ||
				`invalid cpf field lenght (${sanitizedValue.lenght}). expected 11 digits.`;
		}

		if (repeated.includes(sanitizedValue)) {
			// not repeated
			throw message || `invalid cpf (${value}).`;
		}

		let soma = 0;
		let resto;

		for (let i = 1; i <= 9; i += 1) {
			soma += parseInt(sanitizedValue.substring(i - 1, i), 10) * (11 - i);
		}

		resto = (soma * 10) % 11;

		if (resto === 10 || resto === 11) resto = 0;
		if (resto !== parseInt(sanitizedValue.substring(9, 10), 10))
			throw message || `invalid cpf (${value}).`;

		soma = 0;

		for (let i = 1; i <= 10; i += 1) {
			soma += parseInt(sanitizedValue.substring(i - 1, i), 10) * (12 - i);
		}

		resto = (soma * 10) % 11;

		if (resto === 10 || resto === 11) resto = 0;
		if (resto !== parseInt(sanitizedValue.substring(10, 11), 10))
			throw message || `invalid cpf (${value}).`;
	};

	Validator.extend('exists', existsFn);
	Validator.extend('cpf', cpfFn);
});
