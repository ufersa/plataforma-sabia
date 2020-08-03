/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Permission = use('App/Models/Permission');

const { errors, errorPayload } = require('../../Utils');
/**
 * Resourceful controller for interacting with permissions
 */
class PermissionController {
	/**
	 * Show a list of all permissions.
	 * GET permissions
	 */
	async index({ request }) {
		return Permission.query()
			.withParams(request.params)
			.fetch();
	}

	/**
	 * Create/save a new permission.
	 * POST permissions
	 *
	 */
	async store({ request }) {
		const { permission, description } = request.all();

		return Permission.create({ permission, description });
	}

	/**
	 * Display a single permission.
	 * GET permissions/:id
	 *
	 */
	async show({ request }) {
		return Permission.query()
			.withParams(request.params)
			.firstOrFail();
	}

	/**
	 * Update permission details.
	 * PUT or PATCH permissions/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const upPermission = await Permission.findOrFail(id);
		const { permission, description } = request.all();
		upPermission.merge({ permission, description });
		await upPermission.save();
		return upPermission.toJSON();
	}

	/**
	 * Delete a permission with id.
	 * DELETE permissions/:id
	 */
	async destroy({ params, request, response }) {
		const { id } = params;
		const permission = await Permission.findOrFail(id);
		const result = await permission.delete();
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

module.exports = PermissionController;
