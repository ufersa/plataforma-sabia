/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

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
	/*
  async index({ request, response, view }) {}
  */
	/**
	 * Render a form to be used for creating a new role.
	 * GET roles/create
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	/*
   async create({ request, response, view }) {}
*/
	/**
	 * Create/save a new role.
	 * POST roles
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	/*
	async store({ request, response }) {}
*/
	/**
	 * Display a single role.
	 * GET roles/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	/*
   async show({ params, request, response, view }) {}
*/
	/**
	 * Render a form to update an existing role.
	 * GET roles/:id/edit
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	/*
  async edit({ params, request, response, view }) {}
*/
	/**
	 * Update role details.
	 * PUT or PATCH roles/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	/*
   async update({ params, request, response }) {}
*/
	/**
	 * Delete a role with id.
	 * DELETE roles/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	/*
  async destroy({ params, request, response }) {}
  */
}

module.exports = RoleController;
