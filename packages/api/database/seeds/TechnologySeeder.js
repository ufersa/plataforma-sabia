/*
|--------------------------------------------------------------------------
| TechnologySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class TechnologySeeder {
	async run() {
		await Factory.model('App/Models/Technology').createMany(30);
	}
}

module.exports = TechnologySeeder;
