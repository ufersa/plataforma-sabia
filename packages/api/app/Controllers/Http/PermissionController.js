/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Permission = use('App/Models/Permission');

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
	 * Render a form to be used for creating a new permission.
	 * GET permissions/create
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	// async create({ request, response, view }) {}
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
		upPermission.fill({ permission, description });

		return upPermission.save();
	}

	/**
	 * Delete a permission with id.
	 * DELETE permissions/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params }) {
		const { id } = params;
		const permission = await Permission.find(id);
		await permission.delete();
	}
}

module.exports = PermissionController;
