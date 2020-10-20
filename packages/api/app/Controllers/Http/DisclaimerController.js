/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Disclaimer = use('App/Models/Disclaimer');

const { errors, errorPayload } = require('../../Utils');

class DisclaimerController {
	/**
	 * Show a list of all disclaimers.
	 * GET disclaimers
	 */
	async index({ request }) {
		return Disclaimer.query().withParams(request);
	}

	/**
	 * Create/save a new disclaimer.
	 * POST disclaimers
	 */
	async store({ request }) {
		const { description, required, type, version } = request.all();
		return Disclaimer.create({ description, required, type, version });
	}

	/**
	 * Accept disclaimers
	 * POST disclaimers/accept
	 */
	async accept({ auth, request }) {
		const { disclaimers } = request.all();
		const user = await auth.getUser();
		await user.accept(disclaimers);
		return user.disclaimers().fetch();
	}

	/**
	 * Get a single disclaimer.
	 * GET disclaimers/:id
	 */
	async show({ request }) {
		return Disclaimer.query().withParams(request);
	}

	/**
	 * Update disclaimer details.
	 * PUT or PATCH disclaimers/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const disclaimer = await Disclaimer.findOrFail(id);
		const { description, required, type, version } = request.all();
		disclaimer.merge({ description, required, type, version });
		await disclaimer.save();
		return Disclaimer.find(id);
	}

	/**
	 * Delete a disclaimer with id.
	 * DELETE disclaimers/:id
	 */
	async destroy({ params, request, response }) {
		const { id } = params;
		const disclaimer = await Disclaimer.findOrFail(id);
		const result = await disclaimer.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						request.antl('error.resource.resourceDeletedError'),
					),
				);
		}
		return response.status(200).send({ success: true });
	}

	/**
	 * Delete many disclaimers with array of id.
	 * DELETE disclaimers?ids=0,0,0
	 */
	async destroyMany({ request, response }) {
		const { ids } = request.params;
		const result = await Disclaimer.query()
			.whereIn('id', ids)
			.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						request.antl('error.resource.resourceDeletedError'),
					),
				);
		}
		return response.status(200).send({ success: true });
	}
}

module.exports = DisclaimerController;
