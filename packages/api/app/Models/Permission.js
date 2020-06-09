/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Role = use('App/Models/Role');
const Technology = use('App/Models/Technology');
const CE = require('@adonisjs/lucid/src/Exceptions');

class Permission extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	roles() {
		return this.belongsToMany('App/Models/Role');
	}

	users() {
		return this.belongsToMany('App/Models/User');
	}

	/**
	 * Gets a permission by its id or slug
	 *
	 * @param {string|number} permission Permission id or slug.
	 * @returns {Permission}
	 */
	static async getPermission(permission) {
		if (!Number.isNaN(parseInt(permission, 10))) {
			return this.findOrFail(permission);
		}

		const permissionInst = await this.query()
			.where('permission', permission)
			.first();
		if (!permissionInst) {
			throw CE.ModelNotFoundException.raise('Permission');
		}
		return permissionInst;
	}

	static async checkIndividualPermission(user, matchedPermission, params) {
		/** Individual User Permissions */
		let resourceId;
		if (['details-user', 'update-user', 'delete-user'].includes(matchedPermission)) {
			resourceId = params.id ? params.id : params.idUser;
			if (user.id.toString() !== resourceId) {
				return false;
			}
		}
		/** Individual Technology Permissions */
		if (
			[
				'update-technology',
				'associate-technology-users',
				'delete-technology',
				'delete-technology-terms',
				'delete-technology-users',
			].includes(matchedPermission)
		) {
			resourceId = params.id ? params.id : params.idTechnology;
			const technology = await Technology.findOrFail(resourceId);
			const technologyOwner = await technology.getOwner();
			if (!technologyOwner || technologyOwner.id !== user.id) {
				return false;
			}
		}
		return true;
	}

	static async checkPermission(user, permissions, params) {
		// Get All Permission related to user
		const userRole = await Role.find(user.role_id);
		const [userRolePermissions, userDirectPermissions] = await Promise.all([
			userRole.permissions().fetch(),
			user.permissions().fetch(),
		]);
		const userPermissions = [...userRolePermissions.rows, ...userDirectPermissions.rows];
		const userPermissionsArr = userPermissions.map((up) => up.permission);
		const matchedPermissions = permissions.filter((p) => userPermissionsArr.includes(p));
		if (matchedPermissions && matchedPermissions.length) {
			return this.checkIndividualPermission(user, matchedPermissions[0], params);
		}
		return false;
	}
}

module.exports = Permission;
