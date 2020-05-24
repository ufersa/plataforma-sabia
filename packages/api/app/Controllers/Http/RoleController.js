/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');
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
	async index() {
		return Role.all();
	}

	/**
	 * Create/save a new role.
	 * POST roles
	 */
	async store({ request }) {
		const { role, description } = request.all();

		return Role.create({ role, description });
	}

	/**
	 * Display a single role.
	 * GET roles/:id
	 */
	async show({ params }) {
		const { id } = params;
		let role;
		try {
			role = await Role.findOrFail(id);
		} catch (error) {
			throw new ResourceNotFoundException('role', 400, 'E_RESOURCE_NOT_FOUND');
		}
		return role;
	}

	/**
	 * Update role details.
	 * PUT or PATCH roles/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		let upRole;
		try {
			upRole = await Role.findOrFail(id);
		} catch (error) {
			throw new ResourceNotFoundException('role', 400, 'E_RESOURCE_NOT_FOUND');
		}
		const { role, description } = request.all();
		upRole.merge({ role, description });
		await upRole.save();
		return upRole.toJSON();
	}

	/**
	 * Delete a role with id.
	 * DELETE roles/:id
	 */
	async destroy({ params, response }) {
		const { id } = params;
		let role;
		try {
			role = await Role.findOrFail(id);
		} catch (error) {
			throw new ResourceNotFoundException('role', 400, 'E_RESOURCE_NOT_FOUND');
		}
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
