const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const Permission = use('App/Models/Permission');

class PermissionMiddleware {
	async handle({ auth, params }, next, properties) {
		const user = await auth.getUser();
		const isAuthorized = await Permission.checkPermission(user, properties, params);

		if (!isAuthorized) {
			throw new UnauthorizedException();
		}

		return next();
	}
}

module.exports = PermissionMiddleware;
