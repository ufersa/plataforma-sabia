const Technology = use('App/Models/Technology');
const TechnologyCost = use('App/Models/TechnologyCost');
const Cost = use('App/Models/Cost');

const { getTransaction } = require('../../Utils');

const getFields = (request) =>
	request.only([
		'funding_required',
		'funding_type',
		'funding_value',
		'funding_status',
		'notes',
		'costs',
	]);

class TechnologyCostController {
	/**
	 * Show a technology costs.
	 * GET technologies/:id/costs
	 */
	async show({ request }) {
		return TechnologyCost.query()
			.where({
				technology_id: request.params.id,
			})
			.with('costs')
			.first();
	}

	async syncronizeCosts(trx, costs, technologyCost) {
		const updatePromises = costs.map(async (cost) => {
			let updatePromise;
			if (cost.id) {
				const costInst = await Cost.findOrFail(cost.id);
				costInst.merge(cost);
				updatePromise = costInst.save(trx);
			}
			return updatePromise;
		});

		await Promise.all(updatePromises);

		const technologyCosts = await technologyCost.costs().fetch();
		const technologyCostsIds = technologyCosts.rows.map(
			(technology_cost) => technology_cost.id,
		);

		const technologyCostsIdsToDelete = technologyCostsIds.filter(
			(technologyCostsId) => costs.findIndex((cost) => cost.id === technologyCostsId) === -1,
		);

		if (technologyCostsIdsToDelete && technologyCostsIdsToDelete.length) {
			await Cost.query()
				.whereIn('id', technologyCostsIdsToDelete)
				.delete(trx);
		}

		const costsToCreate = costs.filter((cost) => cost.id === undefined);

		if (costsToCreate && costsToCreate.length) {
			const costsInsts = await Cost.createMany(costsToCreate, trx);
			await technologyCost.costs().saveMany(costsInsts, trx);
		}
	}

	/** Update technology cost details
	 * PUT /technologies/:id/costs
	 */
	async update({ request, params }) {
		const { costs, ...data } = getFields(request);
		const technology = await Technology.findOrFail(params.id);
		let trx;
		let technologyCost;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			technologyCost = await technology.technologyCosts().first();
			if (technologyCost) {
				technologyCost.merge(data);
				await technologyCost.save(trx);
			} else {
				technologyCost = await TechnologyCost.create(data, trx);
				await technologyCost.technology().associate(technology, trx);
			}

			if (costs) {
				await this.syncronizeCosts(trx, costs, technologyCost);
			}

			await commit();

			await technologyCost.load('costs');
		} catch (error) {
			trx.rollback();
			throw error;
		}

		return technologyCost;
	}
}

module.exports = TechnologyCostController;
