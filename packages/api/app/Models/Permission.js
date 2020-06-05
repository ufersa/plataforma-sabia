/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Role = use('App/Models/Role');

class Permission extends Model {
	roles() {
		return this.belongsToMany('App/Models/Role');
	}

	users() {
		return this.belongsToMany('App/Models/User');
	}

	static async checkPermission(user, permissions, resourceId) {
		// Get All Permission related to user role
		const userRole = await Role.find(user.role_id);
		const userRolePermissions = await userRole.permissions().fetch();
		const userDirectPermissions = await user.permissions().fetch();
		const userPermissions = [...userRolePermissions.rows, ...userDirectPermissions.rows];
		const userPermissionsArr = userPermissions.map((up) => up.permission);
		const matchedPermissons = permissions.filter((p) => userPermissionsArr.includes(p));
		if (matchedPermissons && matchedPermissons.length) {
			if (matchedPermissons[0] === 'details-users') {
				if (user.id.toString() !== resourceId) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
}

module.exports = Permission;
