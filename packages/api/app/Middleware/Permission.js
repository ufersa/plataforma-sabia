const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const Permission = use('App/Models/Permission');

class PermissionMiddleware {
	async handle({ auth, request }, next, properties) {
		const { params } = request;
		const reqParams = request.all();
		const user = await auth.getUser();
		const isAuthorized = await Permission.checkPermission(user, properties, params, reqParams);

		if (!isAuthorized) {
			throw new UnauthorizedException();
		}

		return next();
	}
}

module.exports = PermissionMiddleware;
