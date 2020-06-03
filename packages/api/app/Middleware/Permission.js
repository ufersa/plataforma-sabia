const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
const PermissionModel = use('App/Models/Permission');
const RoleModel = use('App/Models/Role');
class Permission {
	async handle({ auth }, next, properties) {
		// call next to advance the request
		const user = await auth.getUser();
		// Get All Permission related to user role
		const userRole = await RoleModel.find(user.role_id);
		const userRolePermissions = await userRole.permissions().fetch();
		const UserPermissions = await user.permissions().fetch();
		if (
			!PermissionModel.checkPermission(
				[...userRolePermissions.rows, UserPermissions.rows],
				properties,
			)
		) {
			throw new InvalidAccessException();
		}
		await next();
	}
}

module.exports = Permission;
