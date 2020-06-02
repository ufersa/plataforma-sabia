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
const slugify = require('slugify');

Factory.blueprint('App/Models/Technology', (faker) => {
	return {
		title: faker.sentence({ words: 3 }),
		slug: slugify(faker.sentence({ words: 3 }), { lower: true }),
		description: faker.paragraph(),
		private: faker.bool(),
		thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
		likes: faker.integer({ min: 0, max: 200 }),
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
		status: 'DRAFT',
	};
});

Factory.blueprint('App/Models/Term', async (faker) => {
	return {
		term: faker.string({ length: 10 }),
	};
});
