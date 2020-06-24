const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Permission = use('App/Models/Permission');
const { antl, errors, errorPayload } = require('../../Utils');

class UserController {
	/**
	 * Show a list of all users.
	 * GET users
	 */
	async index({ request }) {
		return User.query()
			.withParams(request.params)
			.with('permissions', (builder) => builder.select('id'))
			.fetch();
	}

	/**
	 * Create/save a new user.
	 * POST users
	 */
	async store({ request }) {
		const { permissions } = request.only(['permissions']);
		const data = request.only([
			'first_name',
			'last_name',
			'email',
			'password',
			'role',
			'full_name',
		]);

		const user = await User.create(data);

		if (permissions) {
			await user.permissions().detach();
			await user.permissions().attach(permissions);
		}

		return User.query().withAssociations(user.id);
	}

	/**
	 * Get a single user.
	 * GET users/:id
	 */
	async show({ request }) {
		return User.query()
			.withParams(request.params)
			.with('permissions', (builder) => builder.select('id'))
			.firstOrFail();
	}

	/**
	 * Update user details.
	 * PUT or PATCH users/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const { permissions, role, full_name } = request.only(['permissions', 'role', 'full_name']);
		const data = request.only([
			'first_name',
			'last_name',
			'company',
			'email',
			'status',
			'role_id',
			'password',
		]);
		const fullNameSplitted = full_name && full_name.split(' ');

		if (fullNameSplitted && fullNameSplitted.length) {
			data.first_name = data.first_name ? data.first_name : fullNameSplitted[0];
			data.last_name = data.last_name
				? data.last_name
				: fullNameSplitted[fullNameSplitted.length - 1];
		}

		const upUser = await User.findOrFail(id);

		if (role) {
			const newUserRole = await Role.getRole(role);
			if (upUser.role_id !== newUserRole.id) {
				await upUser.role().dissociate();
				await upUser.role().associate(newUserRole);
			}
		}

		if (permissions) {
			await upUser.permissions().detach();
			await upUser.permissions().attach(permissions);
		}

		upUser.merge(data);
		await upUser.save();

		return User.query().withAssociations(upUser.id);
	}

	/** POST users/:id/permissions */
	async associatePermissionUser({ params, request }) {
		const { permissions } = request.only(['permissions']);
		const { id } = params;

		const user = await User.findOrFail(id);
		const permissionCollection = await Permission.query()
			.whereIn('permission', permissions)
			.fetch();
		const permissionsIds = permissionCollection.rows.map((permission) => permission.id);
		await user.permissions().attach(permissionsIds);
		return User.query().withAssociations(user.id);
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
