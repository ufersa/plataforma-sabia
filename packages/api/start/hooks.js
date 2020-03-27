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
