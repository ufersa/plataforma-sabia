/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', async (faker) => {
	return {
		email: faker.email(),
		password: faker.string(),
		first_name: faker.string(),
		last_name: faker.string(),
		company: faker.string(),
		zipcode: faker.zip(),
		cpf: faker.string({ length: 11, numeric: true }),
		birth_date: faker.date(),
		phone_number: faker.string({ length: 11, numeric: true }),
		lattes_id: faker.string({ length: 11, numeric: true }),
		address: faker.string(),
		address2: faker.string(),
		district: faker.string(),
		city: faker.string(),
		state: faker.string(),
		country: faker.string(),
		role_id: 1,
	};
});

Factory.blueprint('App/Models/Technology', (faker) => {
	return {
		title: faker.sentence({ words: 3 }),
		description: faker.paragraph(),
		private: faker.bool(),
		likes: 0,
		patent: faker.bool(),
		patent_number: faker.string({ length: 8, alpha: true, numeric: true }),
		primary_purpose: faker.paragraph(),
		secondary_purpose: faker.paragraph(),
		application_mode: faker.paragraph(),
		application_examples: faker.paragraph(),
		installation_time: faker.integer({ min: 1, max: 800 }),
		solves_problem: faker.paragraph(),
		entailes_problem: faker.paragraph(),
		requirements: faker.paragraph(),
		risks: faker.paragraph(),
		contribution: faker.paragraph(),
	};
});

Factory.blueprint('App/Models/Term', async (faker) => {
	return {
		term: faker.name(),
	};
});

Factory.blueprint('App/Models/TechnologyReview', async (faker) => {
	return {
		content: faker.paragraph(),
		rating: faker.integer({ min: 1, max: 5 }),
		positive: JSON.stringify([faker.sentence(), faker.sentence()]),
		negative: JSON.stringify([faker.sentence(), faker.sentence()]),
	};
});

Factory.blueprint('App/Models/TechnologyCost', async (faker) => {
	return {
		funding_required: true,
		funding_type: faker.pickone(['public', 'private', 'collective']),
		funding_value: faker.integer({ min: 10, max: 100000000 }),
		funding_status: faker.pickone(['not_acquired', 'acquiring', 'acquired']),
		notes: faker.paragraph(),
		is_seller: faker.bool(),
		price: faker.integer({ min: 10, max: 100000000 }),
	};
});

Factory.blueprint('App/Models/Cost', async (faker) => {
	return {
		cost_type: faker.pickone([
			'development_costs',
			'implementation_costs',
			'maintenance_costs',
		]),
		description: faker.sentence({ words: 10 }),
		type: faker.pickone(['service', 'equipment', 'others', 'raw_input']),
		quantity: faker.integer({ min: 1, max: 100 }),
		value: faker.integer({ min: 10, max: 100000000 }),
		measure_unit: faker.string({ length: 2 }),
	};
});

Factory.blueprint('App/Models/Revision', async (faker) => {
	return {
		assessment: faker.pickone(['approved', 'requested_changes', 'rejected']),
		description: faker.sentence({ words: 15 }),
	};
});

Factory.blueprint('App/Models/Institution', async (faker) => {
	return {
		name: faker.company(),
		initials: faker.string({ length: 5, casing: 'upper', alpha: true }),
		cnpj: faker.string({ length: 18, casing: 'upper', numeric: true }),
		address: faker.address(),
		district: faker.string(),
		zipcode: faker.zip(),
		city: faker.city(),
		state: faker.state(),
		lat: String(faker.latitude()),
		lng: String(faker.longitude()),
	};
});
