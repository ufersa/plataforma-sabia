const Technology = use('App/Models/Technology');
const TechnologyCost = use('App/Models/TechnologyCost');
const Cost = use('App/Models/Cost');

const { antl, errors, errorPayload, getTransaction } = require('../../Utils');

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
	 * Show a list of all technology costs.
	 * GET technology_costs?technologyId=
	 */
	async index({ request }) {
		const filters = request.all();

		return TechnologyCost.query()
			.withParams(request.params)
			.withFilters(filters)
			.fetch();
	}

	/** Create/save a new technology cost
	 * POST	/technologies/:id/technology_costs
	 */
	async store({ request, params, response }) {
		const { costs, ...data } = getFields(request);
		const technology = await Technology.findOrFail(params.id);
		let trx;
		let technologyCost;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			technologyCost = await technology.technologyCosts().first();

			if (technologyCost) {
				return response
					.status(400)
					.send(
						errorPayload(
							errors.UNIQUE_TECHNOLOGY_COST_ERROR,
							antl('error.costs.uniqueTechnologyCostError'),
						),
					);
			}

			technologyCost = await TechnologyCost.create(data, trx);
			await technologyCost.technology().associate(technology, trx);
			const costsInsts = await Cost.createMany(costs, trx);
			await technologyCost.costs().saveMany(costsInsts, trx);

			await commit();

			await technologyCost.load('costs');
		} catch (error) {
			trx.rollback();
			throw error;
		}

		return technologyCost;
	}

	async syncronizeCosts(trx, costs, technologyCost) {
		// Costs to create
		const costsToCretate = costs.filter((cost) => cost.id === undefined);
		if (costsToCretate) {
			const costsInsts = await Cost.createMany(costsToCretate, trx);
			await technologyCost.costs().saveMany(costsInsts, trx);
		}

		// Costs to update
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

		// Costs to delete
		const technologyCosts = await technologyCost.costs().fetch();
		const technologyCostsIds = technologyCosts.rows.map(
			(technology_cost) => technology_cost.id,
		);

		const costsIds = costs.map((cost) => cost.id);

		const technologyCostsIdsToDelete = technologyCostsIds.filter(
			(technologyCostsId) => !costsIds.includes(technologyCostsId),
		);

		const deletePromises = technologyCostsIdsToDelete.map(async (id) => {
			const costInst = await Cost.findOrFail(id);
			return costInst.delete(trx);
		});

		await Promise.all(deletePromises);
	}

	/** Update technology cost details
	 * PUT /technologies/:id/technology_costs
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
			technologyCost.merge(data);
			await technologyCost.save(trx);

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
