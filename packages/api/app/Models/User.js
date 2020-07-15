const randtoken = require('rand-token');

/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Role = use('App/Models/Role');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

const Encryption = use('Encryption');

const { roles } = require('../Utils');

class User extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
		/**
		 * A hook to hash the user password before saving
		 * it to the database.
		 */
		this.addHook('beforeSave', async (userInstance) => {
			if (userInstance.dirty.password) {
				// eslint-disable-next-line no-param-reassign
				userInstance.password = await Hash.make(userInstance.password);
			}
		});
	}

	static async create(payload) {
		const modelInstance = new User();
		const { status, full_name, role, ...data } = payload;

		if (status) data.status = status;

		const fullNameSplitted = full_name && full_name.split(' ');

		if (fullNameSplitted && fullNameSplitted.length) {
			data.first_name = fullNameSplitted[0];
			data.last_name = fullNameSplitted[fullNameSplitted.length - 1];
		}

		modelInstance.fill(data);
		await modelInstance.save();
		const userRole = await Role.getRole(role || roles.DEFAULT_USER);
		await modelInstance.role().associate(userRole);
		return modelInstance;
	}

	static get computed() {
		return ['full_name'];
	}

	static get hidden() {
		return ['password', 'temp_email'];
	}

	getFullName({ first_name, last_name }) {
		return `${first_name} ${last_name}`;
	}

	/**
	 * A relationship on tokens is required for auth to
	 * work. Since features like `refreshTokens` or
	 * `rememberToken` will be saved inside the
	 * tokens table.
	 *
	 * @function tokens
	 *
	 * @returns {object}
	 */
	tokens() {
		return this.hasMany('App/Models/Token');
	}

	/**
	 * Every user has a role.
	 *
	 * @returns {Model} Role Model
	 */
	role() {
		return this.belongsTo('App/Models/Role');
	}

	/**
	 * Users have many permissions. Each role comes with it's own set of permission
	 * but a user can also be assigned an permission individually.
	 *
	 * @returns {Model[]} Array of Permissions.
	 */
	permissions() {
		return this.belongsToMany('App/Models/Permission');
	}

	technologies() {
		return this.belongsToMany('App/Models/Technology').withPivot(['role']);
	}

	reviews() {
		return this.hasMany('App/Models/TechnologyReview');
	}

	bookmarks() {
		return this.belongsToMany('App/Models/Technology').pivotTable('user_bookmarks');
	}

	generateToken(type) {
		return this.tokens().create({
			type,
			token: Encryption.encrypt(randtoken.generate(16)),
			is_revoked: false,
		});
	}

	isVerified() {
		return this.status === 'verified';
	}

	/**
	 * Runs the user query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filters The query filters
	 *
	 * @returns {object}
	 */
	static scopeWithBookmarksFilters(query, filters) {
		const technologyId = Number(filters.technologyId);

		query.with('bookmarks');

		if (technologyId) {
			query.whereHas('bookmarks', (builder) => {
				builder.where({ technology_id: technologyId });
			});
		}

		return query;
	}
}

module.exports = User;
