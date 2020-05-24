/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');
const Permission = use('App/Models/Permission');

const { antl, errors, errorPayload } = require('../../Utils');
/**
 * Resourceful controller for interacting with permissions
 */
class PermissionController {
	/**
	 * Show a list of all permissions.
	 * GET permissions
	 */
	async index() {
		return Permission.all();
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
	async show({ params }) {
		const { id } = params;
		let permission;
		try {
			permission = await Permission.findOrFail(id);
		} catch (error) {
			throw new ResourceNotFoundException('permission', 400, 'E_RESOURCE_NOT_FOUND');
		}
		return permission;
	}

	/**
	 * Update permission details.
	 * PUT or PATCH permissions/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		let upPermission;
		try {
			upPermission = await Permission.findOrFail(id);
		} catch (error) {
			throw new ResourceNotFoundException('permission', 400, 'E_RESOURCE_NOT_FOUND');
		}
		const { permission, description } = request.all();
		upPermission.merge({ permission, description });
		await upPermission.save();
		return upPermission.toJSON();
	}

	/**
	 * Delete a permission with id.
	 * DELETE permissions/:id
	 */
	async destroy({ params, response }) {
		const { id } = params;
		let permission;
		try {
			permission = await Permission.findOrFail(id);
		} catch (error) {
			throw new ResourceNotFoundException('permission', 400, 'E_RESOURCE_NOT_FOUND');
		}
		const result = await permission.delete();

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

module.exports = PermissionController;
