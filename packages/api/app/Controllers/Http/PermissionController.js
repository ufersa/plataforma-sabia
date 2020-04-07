/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

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
	// async index({ request, response, view }) {}
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
	// async store({ request, response }) {}
	/**
	 * Display a single permission.
	 * GET permissions/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	// async show({ params, request, response, view }) {}
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
	// async update({ params, request, response }) {}
	/**
	 * Delete a permission with id.
	 * DELETE permissions/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	// async destroy({ params, request, response }) {}
}

module.exports = PermissionController;
