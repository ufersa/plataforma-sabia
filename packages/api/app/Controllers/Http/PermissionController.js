/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Permission = use('App/Models/Permission');
const Antl = use('Antl');

/**
 * Resourceful controller for interacting with permissions
 */
class PermissionController {
	/**
	 * Show a list of all permissions.
	 * GET permissions
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index() {
		return Permission.all();
	}

	/**
	 * Create/save a new permission.
	 * POST permissions
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request }) {
		const { permission, description } = request.all();

		return Permission.create({ permission, description });
	}

	/**
	 * Display a single permission.
	 * GET permissions/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params }) {
		const { id } = params;
		return Permission.find(id);
	}

	/**
	 * Render a form to update an existing permission.
	 * GET permissions/:id/edit
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	// async edit({ params, request, response, view }) {}
	/**
	 * Update permission details.
	 * PUT or PATCH permissions/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request }) {
		const { id } = params;
		const upPermission = await Permission.find(id);
		const { permission, description } = request.all();
		upPermission.merge({ permission, description });
		await upPermission.save();
		return upPermission.toJSON();
	}

	/**
	 * Delete a permission with id.
	 * DELETE permissions/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, response }) {
		const { id } = params;

		const permission = await Permission.find(id);
		if (!permission) {
			return response.status(400).send({
				error: {
					message: Antl.formatMessage('messages.resourceNotFound'),
				},
			});
		}

		const result = await permission.delete();

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

module.exports = PermissionController;
