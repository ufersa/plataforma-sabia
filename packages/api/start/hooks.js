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

	// eslint-disable-next-line global-require
	const CustomValidators = require('../app/Utils/CustomValidators');

	Object.values(CustomValidators).forEach((validator) => {
		Validator.extend([validator.name], validator);
	});

	const Env = use('Env');
	const View = use('View');

	View.global('APP_URL', () => {
		return Env.get('APP_URL');
	});
});
