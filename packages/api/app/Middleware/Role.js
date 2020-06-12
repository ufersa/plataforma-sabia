const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const Role = use('App/Models/Role');

class RoleMiddleware {
	async handle({ auth }, next, properties) {
		const user = await auth.getUser();
		await user.load('role');
		const { role } = user.toJSON().role;
		if (!Role.checkRole(role, properties)) {
			throw new UnauthorizedException();
		}
		await next();
	}
}

module.exports = RoleMiddleware;
