/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Role = use('App/Models/Role');
const Antl = use('Antl');

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
	/**
	 * Show a list of all roles.
	 * GET roles
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */

	async index() {
		return Role.all();
	}

	/**
	 * Create/save a new role.
	 * POST roles
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async store({ request }) {
		const { role, description } = request.all();

		return Role.create({ role, description });
	}

	/**
	 * Display a single role.
	 * GET roles/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */

	async show({ params }) {
		const { id } = params;
		return Role.find(id);
	}

	/**
	 * Update role details.
	 * PUT or PATCH roles/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async update({ params, request }) {
		const { id } = params;
		const upRole = await Role.find(id);
		const { role, description } = request.all();
		upRole.merge({ role, description });
		await upRole.save();
		return upRole.toJSON();
	}

	/**
	 * Delete a role with id.
	 * DELETE roles/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */

	async destroy({ params, response }) {
		const { id } = params;

		const role = await Role.find(id);
		if (!role) {
			return response.status(400).send({
				error: {
					message: Antl.formatMessage('messages.resourceNotFound'),
				},
			});
		}

		const result = await role.delete();

		if (!result) {
			return response.status(500).send({
				error: {
					message: Antl.formatMessage('messages.resourceDeletedError'),
				},
			});
		}

		return response.status(200).send({
			error: {
				message: Antl.formatMessage('messages.resourceDeleted'),
			},
		});
	}
}

module.exports = RoleController;
