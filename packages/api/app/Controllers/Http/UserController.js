const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Permission = use('App/Models/Permission');
const { antl, errors, errorPayload } = require('../../Utils');

// const Database = use('Database');

class UserController {
	/**
	 * Show a list of all users.
	 * GET users
	 */
	async index({ request }) {
		return User.query()
			.with('role')
			.with('permissions')
			.withParams(request.params)
			.fetch();
	}

	/**
	 * Create/save a new user.
	 * POST users
	 */
	async store({ request }) {
		const { permissions, role, full_name } = request.only(['permissions', 'role', 'full_name']);
		const data = request.only(['first_name', 'last_name', 'email', 'password']);

		const fullNameSplitted = full_name && full_name.split(' ');

		if (fullNameSplitted && fullNameSplitted.length) {
			[data.first_name] = fullNameSplitted;
			data.last_name = fullNameSplitted[fullNameSplitted.length - 1];
		}

		const userRole = await Role.getRole(role || 'DEFAULT_USER');
		const user = await User.create(data);
		await user.role().associate(userRole);
		if (permissions) {
			const permissionCollection = await Permission.query()
				.whereIn('permission', permissions)
				.fetch();
			const permissionsIds = permissionCollection.rows.map((p) => p.id);
			await user.permissions().attach(permissionsIds);
		}
		return User.query()
			.with('role')
			.with('permissions')
			.where('id', user.id)
			.first();
	}

	/**
	 * Get a single user.
	 * GET users/:id
	 */
	async show({ request }) {
		return User.query()
			.withParams(request.params)
			.fetch();
	}

	/**
	 * Update user details.
	 * PUT or PATCH users/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const upUser = await User.findOrFail(id);
		const { permissions, role, full_name } = request.only(['permissions', 'role', 'full_name']);
		const data = request.only(['first_name', 'last_name', 'email', 'password']);

		const fullNameSplitted = full_name && full_name.split(' ');

		if (fullNameSplitted && fullNameSplitted.length) {
			[data.first_name] = fullNameSplitted;
			data.last_name = fullNameSplitted[fullNameSplitted.length - 1];
		}

		if (role) {
			const newUserRole = await Role.getRole(role);
			if (upUser.role_id !== newUserRole.id) {
				upUser.role().dissociate();
				await upUser.role().associate(newUserRole);
			}
		}

		if (permissions) {
			await upUser.permissions().detach();
			const permissionCollection = await Permission.query()
				.whereIn('permission', permissions)
				.fetch();
			const permissionsIds = permissionCollection.rows.map((p) => p.id);
			await upUser.permissions().attach(permissionsIds);
		}

		upUser.merge(data);
		await upUser.save();
		return User.query()
			.with('role')
			.with('permissions')
			.where('id', upUser.id)
			.first();
	}

	/** POST users/:idUser/permissions */
	async associatePermissionUser({ params, request }) {
		const { permissions } = request.only(['permissions']);
		const { idUser } = params;
		const user = await User.findOrFail(idUser);
		const permissionCollection = await Permission.query()
			.whereIn('permission', permissions)
			.fetch();
		const permissionsIds = permissionCollection.rows.map((p) => p.id);
		await user.permissions().attach(permissionsIds);
		return User.query()
			.with('role')
			.with('permissions')
			.where('id', user.id)
			.first();
	}

	/**
	 * Delete a user with id.
	 * DELETE users/:id
	 */
	async destroy({ params, response }) {
		const { id } = params;
		const user = await User.findOrFail(id);
		const result = await user.delete();
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

module.exports = UserController;
