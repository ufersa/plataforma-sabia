/*
|--------------------------------------------------------------------------
| LocationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const City = use('App/Models/City');

class LocationSeeder {
	async run() {
		const getRandom = (list) => {
			return list.rows[Math.floor(Math.random() * list.rows.length)];
		};
		const locations = await Factory.model('App/Models/Location').createMany(20);
		const cities = await await City.query()
			.limit(20)
			.fetch();
		await Promise.all(
			locations.map(async (location) => {
				const city = getRandom(cities);
				await location.city().associate(city);
			}),
		);
	}
}

module.exports = LocationSeeder;
