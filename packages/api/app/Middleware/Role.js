const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
const RoleModel = use('App/Models/Role');
class Role {
	async handle({ auth }, next, properties) {
		// call next to advance the request
		const user = await auth.getUser();
		await user.load('role');
		const userRole = user.toJSON().role.role;
		if (!RoleModel.checkRole(userRole, properties)) {
			throw new InvalidAccessException();
		}
		await next();
	}
}

module.exports = Role;
