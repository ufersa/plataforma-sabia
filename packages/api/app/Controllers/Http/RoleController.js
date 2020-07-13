/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Role = use('App/Models/Role');

const { antl, errors, errorPayload } = require('../../Utils');
/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
	/**
	 * Show a list of all roles.
	 * GET roles
	 */
	async index({ request }) {
		return Role.query()
			.with('permissions', (builder) => builder.select('id'))
			.withParams(request.params)
			.fetch();
	}

	/**
	 * Create/save a new role.
	 * POST roles
	 */
	async store({ request }) {
		const { role, description, permissions } = request.all();
		const newRole = await Role.create({ role, description });
		if (permissions) {
			await newRole.permissions().detach();
			await newRole.permissions().attach(permissions);
		}
		return Role.query()
			.with('permissions', (builder) => builder.select('id'))
			.where('id', newRole.id)
			.firstOrFail();
	}

	/**
	 * Display a single role.
	 * GET roles/:id
	 */
	async show({ request }) {
		return Role.query()
			.with('permissions', (builder) => builder.select('id'))
			.withParams(request.params)
			.firstOrFail();
	}

	/**
	 * Update role details.
	 * PUT or PATCH roles/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const upRole = await Role.findOrFail(id);
		const { description, permissions } = request.all();
		upRole.merge({ description });
		if (permissions) {
			await upRole.permissions().detach();
			await upRole.permissions().attach(permissions);
		}
		await upRole.save();
		return upRole.toJSON();
	}

	/**
	 * Delete a role with id.
	 * DELETE roles/:id
	 */
	async destroy({ params, response }) {
		const { id } = params;
		const role = await Role.findOrFail(id);
		const result = await role.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						antl('error.resource.resourceDeletedError'),
					),
				);
		}

		return response.status(200).send({ success: true });
	}
}

module.exports = RoleController;
