/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Technology = use('App/Models/Technology');
const Term = use('App/Models/Term');
const Taxonomy = use('App/Models/Taxonomy');
const User = use('App/Models/User');

const { antl, errors, errorPayload } = require('../../Utils');

// get only useful fields
const getFields = (request) =>
	request.only([
		'title',
		'description',
		'private',
		'thumbnail',
		'likes',
		'patent',
		'patent_number',
		'primary_purpose',
		'secondary_purpose',
		'application_mode',
		'application_examples',
		'installation_time',
		'solves_problem',
		'entailes_problem',
		'requirements',
		'risks',
		'contribution',
		'status',
	]);

class TechnologyController {
	/**
	 * Show a list of all technologies.
	 * GET technologies?term=
	 */
	async index({ request, response }) {
		const query = request.get();
		response.header('Total', await Technology.getCount());
		if (query.term) {
			const term = await Term.getTerm(query.term);
			return Technology.query()
				.whereHas('terms', (builder) => {
					builder.where('id', term.id);
				})
				.with('terms', (builder) => {
					builder.where('id', term.id);
				})
				.withParams(request.params)
				.fetch();
		}
		return Technology.query()
			.withParams(request.params)
			.fetch();
	}

	/**
	 * Get a single technology.
	 * GET technologies/:id
	 */
	async show({ params }) {
		const { id } = params;
		return Technology.findOrFail(id);
	}

	/**
	 * Get technology terms.
	 * GET /technologies/:id/terms?taxonomy=
	 */
	async showTechnologyTerms({ request, params }) {
		const { id } = params;
		const query = request.get();
		const technology = await Technology.findOrFail(id);
		if (query.taxonomy) {
			const taxonomy = await Taxonomy.getTaxonomy(query.taxonomy);
			return Term.query()
				.whereHas('technologies', (builder) => {
					builder.where('id', technology.id);
				})
				.where('taxonomy_id', taxonomy.id)
				.fetch();
		}

		return Term.query()
			.whereHas('technologies', (builder) => {
				builder.where('id', technology.id);
			})
			.fetch();
	}

	/**
	 * Get technology users.
	 * GET /technologies/:id/users?role=
	 */
	async showTechnologyUsers({ request, params }) {
		const { id } = params;
		const query = request.get();
		const technology = await Technology.findOrFail(id);
		if (query.role) {
			return technology
				.users()
				.wherePivot('role', query.role)
				.fetch();
		}
		return technology.users().fetch();
	}

	/**
	 * Delete a technology with id.
	 * DELETE technologies/:id
	 */
	async destroy({ params, response }) {
		const technology = await Technology.findOrFail(params.id);
		const result = await technology.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						antl('error.resource.resourceDeletedError'),
					),
				);
		}

		return response.status(200).send({ success: true });
	}

	/**
	 * Delete a technology term.
	 * DELETE technologies/:idTechnology/terms/:term
	 */
	async deleteTechnologyTerm({ params, response }) {
		const { idTechnology, term } = params;
		const [technology, termObj] = await Promise.all([
			Technology.findOrFail(idTechnology),
			Term.getTerm(term),
		]);
		await technology.terms().detach([termObj.id]);
		return response.status(200).send({ success: true });
	}

	/**
	 * Delete a technology user.
	 * DELETE technologies/:idTechnology/users/:idUser
	 */
	async deleteTechnologyUser({ params, response }) {
		const { idTechnology, idUser } = params;
		const [technology, user] = await Promise.all([
			Technology.findOrFail(idTechnology),
			User.findOrFail(idUser),
		]);
		await technology.users().detach([user.id]);
		return response.status(200).send({ success: true });
	}

	async syncronizeUsers(users, technology, detach = false) {
		if (detach) {
			await technology.users().detach();
		}
		const usersId = users.map((item) => item.userId);
		const userMap = new Map(users.map((user) => [user.userId, user.role]));
		await technology.users().attach(usersId, (row) => {
			// eslint-disable-next-line no-param-reassign
			row.role = userMap.get(row.user_id);
		});
	}

	/**
	 * Create/save a new technology.
	 * POST technologies
	 */
	async store({ request }) {
		const data = getFields(request);
		const technology = await Technology.create(data);
		const { users } = request.only(['users']);
		if (users) {
			await this.syncronizeUsers(users, technology);
			return Technology.query()
				.with('users')
				.where('id', technology.id)
				.fetch();
		}
		return technology;
	}

	/** POST technologies/:idTechnology/users */
	async associateTechnologyUser({ params, request }) {
		const { users } = request.only(['users']);
		const { idTechnology } = params;
		const technology = await Technology.findOrFail(idTechnology);
		await this.syncronizeUsers(users, technology);
		return Technology.query()
			.with('users')
			.where('id', technology.id)
			.fetch();
	}

	/**
	 * Update technology details.
	 * PUT or PATCH technologies/:id
	 * If termId or termSlug is passed in body, creates a new technolgy term
	 * If users is passed updates users in technology
	 */
	async update({ params, request }) {
		const technology = await Technology.findOrFail(params.id);
		const data = getFields(request);
		technology.merge(data);
		await technology.save();
		const { term } = request.only(['term']);
		if (term) {
			const termObj = await Term.getTerm(term);
			await technology.terms().save(termObj);
			technology.terms = await technology.terms().fetch();
		}
		const { users } = request.only(['users']);
		if (users) {
			await this.syncronizeUsers(users, technology, true);
			return Technology.query()
				.with('users')
				.where('id', technology.id)
				.fetch();
		}

		return technology;
	}
}

module.exports = TechnologyController;
