const { hooks } = require('@adonisjs/ignitor');

const AlgoliaFakeProvider = require('../test/utils/AlgoliaFakeService');
const AnalyticsFakeProvider = require('../test/utils/AnalyticsFakeService');

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
		ioc.singletonFake('App/Services/Analytics', () => {
			return AnalyticsFakeProvider;
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
});
