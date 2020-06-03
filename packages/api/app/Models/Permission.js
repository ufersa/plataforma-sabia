/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Permission extends Model {
	roles() {
		return this.belongsToMany('App/Models/Role');
	}

	users() {
		return this.belongsToMany('App/Models/User');
	}

	static checkPermission(userPermissions, permissionsArr) {
		const permissions = userPermissions.map((up) => up.permission);
		const matchedPermissons = [];
		permissionsArr.forEach((p) => {
			if (permissions.includes(p)) {
				matchedPermissons.push(p);
			}
		});
		if (matchedPermissons && matchedPermissons.length) {
			return true;
		}

		return false;
	}
}

module.exports = Permission;
