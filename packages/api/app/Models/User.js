const randtoken = require('rand-token');

/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Role = use('App/Models/Role');
const Disclaimer = use('App/Models/Disclaimer');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

const Encryption = use('Encryption');

const { roles } = require('../Utils/roles_capabilities');

/**
 * Required fields for checking if personal data registration is completed
 */
const personal_data_required_fields = [
	'full_name',
	'email',
	'cpf',
	'birth_date',
	'phone_number',
	'zipcode',
	'address',
	'district',
	'city',
	'state',
	'country',
];

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
	 * Checks if user personal data registration is completed
	 * based on personal_data_required_fields
	 *
	 * @returns {string[]} uncompletedFields: Personal data fields uncompleted
	 */
	getCheckPersonalData() {
		const uncompletedFields = [];
		const model = this.toJSON();
		personal_data_required_fields.forEach((field) => {
			const userField = model[field];

			if (
				!(
					!!userField &&
					((Array.isArray(userField) && !!userField.length) ||
						!!Object.values(userField).length)
				)
			) {
				uncompletedFields.push(field);
			}
		});
		return uncompletedFields;
	}

	/**
	 * Checks if user academic data registration is completed
	 *
	 * @returns {string[]} uncompletedFields: Academic data fields uncompleted
	 */
	async getCheckAcademicData() {
		const uncompletedFields = [];

		const { lattes_id } = this;
		if (
			!(
				!!lattes_id &&
				((Array.isArray(lattes_id) && !!lattes_id.length) ||
					!!Object.values(lattes_id).length)
			)
		) {
			uncompletedFields.push('lattes_id');
		}

		const knowledgeArea = await this.areas().first();
		if (!knowledgeArea) {
			uncompletedFields.push('knowledgeArea');
		}

		return uncompletedFields;
	}

	/**
	 * Checks if user organizational data registration is completed
	 *
	 * @returns {string[]} uncompletedFields: Organizational data fields uncompleted
	 */
	async getCheckOrganizationalData() {
		const uncompletedFields = [];

		const institution = this.institution().first();
		if (!institution) {
			uncompletedFields.push('institution');
		}

		return uncompletedFields;
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

	uploads() {
		return this.hasMany('App/Models/Upload');
	}

	disclaimers() {
		return this.belongsToMany('App/Models/Disclaimer')
			.pivotTable('user_disclaimers')
			.withTimestamps();
	}

	comments() {
		return this.hasMany('App/Models/TechnologyComment');
	}

	institution() {
		return this.belongsTo('App/Models/Institution');
	}

	announcements() {
		return this.hasMany('App/Models/Announcement');
	}

	messages() {
		return this.hasMany('App/Models/Message');
	}

	ideas() {
		return this.hasMany('App/Models/Idea');
	}

	orders() {
		return this.hasMany('App/Models/TechnologyOrder');
	}

	services() {
		return this.hasMany('App/Models/Service');
	}

	serviceOrders() {
		return this.hasMany('App/Models/ServiceOrder');
	}

	serviceOrderReviews() {
		return this.hasMany('App/Models/ServiceOrderReview');
	}

	areas() {
		return this.belongsToMany(
			'App/Models/KnowledgeArea',
			'user_id',
			'knowledge_area_id',
			'id',
			'knowledge_area_id',
		).pivotTable('user_areas');
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

	isPending() {
		return this.status === 'pending';
	}

	isInvited() {
		return this.status === 'invited';
	}

	async getRole() {
		const role = await this.role().first();
		return role.role;
	}

	/**
	 * Invites an user
	 *
	 * @param {object} userData The user data
	 * @param {boolean} provision Provisions the user if it's true
	 * @returns {User} The invited user
	 */
	static invite(userData, provision = false) {
		return provision
			? User.findOrCreate(
					{ email: userData.email },
					{ ...userData, password: randtoken.generate(12), status: 'invited' },
			  )
			: User.findBy('email', userData.email);
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

	/**
	 * Runs the term query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filters The query filters
	 *
	 * @returns {object}
	 */
	static scopeWithResearcherFilters(query, filters) {
		if (filters.name) {
			query
				.where('first_name', 'LIKE', `%${filters.name}%`)
				.orWhere('last_name', 'LIKE', `%${filters.name}%`);
		}
		if (filters.institution) {
			query.whereHas('institution', (builder) => {
				builder.where('name', 'LIKE', `%${filters.institution}%`);
			});
		}

		if (filters.keyword) {
			query.whereHas('technologies.terms', (builder) => {
				builder.where('term', 'LIKE', `%${filters.keyword}%`);
			});
		}

		if (filters.area) {
			const areaList = filters.area?.split(',') || [];
			if (areaList.length) {
				query.whereHas('areas', (builder) => {
					builder.whereIn('knowledge_areas.knowledge_area_id', areaList);
				});
			}
		}

		return query;
	}

	async acceptMandatory(type) {
		let mandatory = await Disclaimer.query()
			.select('id')
			.where('required', true)
			.where('type', type)
			.fetch();

		mandatory = mandatory.toJSON().map((row) => {
			return row.id;
		});

		return this.accept(mandatory);
	}

	async accept(arrayIds) {
		let arrayChecked = await Disclaimer.query()
			.select('id')
			.whereIn('id', arrayIds)
			.fetch();

		arrayChecked = arrayChecked.toJSON().map((row) => {
			return row.id;
		});
		return this.disclaimers().attach(arrayChecked);
	}
}

module.exports = User;
