/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Permission extends Model {
	roles() {
		return this.belongsToMany('App/Models/Role');
	}

	users() {
		return this.belongsToMany('App/Models/User');
	}

	static scopeWithParams(query, { page, perPage, order, orderBy }) {
		return query
			.offset((page - 1) * perPage)
			.limit(perPage)
			.orderBy(orderBy, order);
	}
}

module.exports = Permission;
