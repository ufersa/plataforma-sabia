const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const PermissionModel = use('App/Models/Permission');

class Permission {
	async handle({ auth, params }, next, properties) {
		const user = await auth.getUser();
		const isPermited = await PermissionModel.checkPermission(user, properties, params);
		if (!isPermited) {
			throw new UnauthorizedException();
		}
		await next();
	}
}

module.exports = Permission;
