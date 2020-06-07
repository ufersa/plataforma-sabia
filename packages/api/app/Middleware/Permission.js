const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
const PermissionModel = use('App/Models/Permission');

class Permission {
	async handle({ auth, params }, next, properties) {
		// call next to advance the request
		const user = await auth.getUser();
		const isPermited = await PermissionModel.checkPermission(user, properties, params);
		if (!isPermited) {
			throw new InvalidAccessException();
		}
		await next();
	}
}

module.exports = Permission;
