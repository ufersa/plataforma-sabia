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

Factory.blueprint('App/Models/Technology', (faker) => {
	const regions = ['Nordeste', 'Sudoeste', 'Centro-Oeste', 'Norte', 'Sul'];
	const categories = ['Água', 'Saneamento', 'Energia Elétrica', 'Energia Solar'];

	return {
		title: faker.sentence({ words: 3 }),
		description: faker.paragraph(),
		logo: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
		site_url: faker.url({ protocol: 'http' }),
		private: faker.bool(),
		category: categories[faker.integer({ min: 0, max: categories.length - 1 })],
		price: faker.floating({ min: 0, max: 5000, fixed: 2 }),
		place: faker.sentence({ words: 1 }),
		likes: faker.integer({ min: 0, max: 200 }),
		weeks: faker.integer({ min: 0, max: 10 }),
		region: regions[faker.integer({ min: 0, max: regions.length - 1 })],
	};
});
