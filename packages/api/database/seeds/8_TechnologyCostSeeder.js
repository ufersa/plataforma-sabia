/* eslint-disable no-await-in-loop */
/*
|--------------------------------------------------------------------------
| TechnologyCostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Technology = use('App/Models/Technology');

class TechnologyCostSeeder {
	async run() {
		const technologies = await Technology.all();
		for (const technology of technologies.rows) {
			const technologyCost = await Factory.model('App/Models/TechnologyCost').create();
			await technologyCost.technology().associate(technology);
			const costs = await Factory.model('App/Models/Cost').createMany(3);
			await technologyCost.costs().saveMany(costs);
		}
	}
}

module.exports = TechnologyCostSeeder;
