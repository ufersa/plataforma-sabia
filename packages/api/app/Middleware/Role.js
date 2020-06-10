const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const RoleModel = use('App/Models/Role');
class Role {
	async handle({ auth }, next, properties) {
		const user = await auth.getUser();
		await user.load('role');
		const userRole = user.toJSON().role.role;
		if (!RoleModel.checkRole(userRole, properties)) {
			throw new UnauthorizedException();
		}
		await next();
	}
}

module.exports = Role;
