/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Config = use('Adonis/Src/Config');
const Technology = use('App/Models/Technology');
const Term = use('App/Models/Term');
const Taxonomy = use('App/Models/Taxonomy');
const User = use('App/Models/User');

const algoliasearch = use('App/Services/AlgoliaSearch');
const algoliaConfig = Config.get('algolia');
const indexObject = algoliasearch.initIndex(algoliaConfig.indexName);
const CATEGORY_TAXONOMY_SLUG = 'CATEGORY';

const { antl, errors, errorPayload, getTransaction } = require('../../Utils');

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
	async index({ request }) {
		const query = request.get();
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
	async show({ request }) {
		return Technology.query()
			.withParams(request.params)
			.firstOrFail();
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
		// detaches related entities
		await Promise.all([technology.users().detach(), technology.terms().detach()]);
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
	 * DELETE technologies/:id/terms/:term
	 */
	async deleteTechnologyTerm({ params, response }) {
		const { id, term } = params;
		const [technology, termObj] = await Promise.all([
			Technology.findOrFail(id),
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
		const { id, idUser } = params;
		const [technology, user] = await Promise.all([
			Technology.findOrFail(id),
			User.findOrFail(idUser),
		]);
		await technology.users().detach([user.id]);
		return response.status(200).send({ success: true });
	}

	async syncronizeUsers(trx, users, technology, detach = false) {
		if (detach) {
			await technology.users().detach(null, null, trx);
		}
		const usersId = users.map((item) => item.userId);
		const userMap = new Map(users.map((user) => [user.userId, user.role]));
		await technology.users().attach(
			usersId,
			(row) => {
				// eslint-disable-next-line no-param-reassign
				row.role = userMap.get(row.user_id);
			},
			trx,
		);
	}

	async syncronizeTerms(trx, terms, technology, detach = false) {
		if (detach) {
			await technology.terms().detach(null, null, trx);
		}
		const termInstances = await Promise.all(terms.map((term) => Term.getTerm(term)));
		await technology.terms().attach(
			termInstances.map((term) => term.id),
			null,
			trx,
		);
	}

	indexToAlgolia(technologyData) {
		const defaultCategory = 'Não definida';
		const technologyForAlgolia = { ...technologyData.toJSON(), category: defaultCategory };

		if (technologyForAlgolia.terms) {
			const termsObj = technologyForAlgolia.terms.reduce((acc, obj) => {
				acc[obj.taxonomy.taxonomy] = obj.term;
				return acc;
			}, {});
			technologyForAlgolia.category = termsObj[CATEGORY_TAXONOMY_SLUG] || defaultCategory;

			delete technologyForAlgolia.terms;
		}

		indexObject.saveObject(technologyForAlgolia);
	}

	/**
	 * Create/save a new technology.
	 * If terms is provided, it adds the related terms
	 * If users is provided, it adds the related users
	 */
	async store({ request }) {
		const data = getFields(request);

		let technology;
		let trx;

		try {
			const { init, commit } = getTransaction();
			trx = await init();

			technology = await Technology.create(data, trx);

			const { users } = request.only(['users']);
			if (users) {
				await this.syncronizeUsers(trx, users, technology);
			}

			const { terms } = request.only(['terms']);
			if (terms) {
				await this.syncronizeTerms(trx, terms, technology);
			}

			await commit();

			if (users) {
				await technology.load('users');
			}

			if (terms) {
				await technology.load('terms.taxonomy');
			}
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		this.indexToAlgolia(technology);

		return technology;
	}

	/** POST technologies/:idTechnology/users */
	async associateTechnologyUser({ params, request }) {
		const { users } = request.only(['users']);
		const { id } = params;
		const technology = await Technology.findOrFail(id);

		let trx;

		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await this.syncronizeUsers(trx, users, technology);

			await commit();

			await technology.load('users');
		} catch (error) {
			trx.rollback();
			throw error;
		}

		return technology;
	}

	/**
	 * Update technology details.
	 * PUT or PATCH technologies/:id
	 * If terms are provided, the related terms are updated
	 * If users are provided, the related users are updated
	 */
	async update({ params, request }) {
		const technology = await Technology.findOrFail(params.id);
		const data = getFields(request);
		technology.merge(data);

		let trx;

		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await technology.save(trx);

			const { users } = request.only(['users']);
			if (users) {
				await this.syncronizeUsers(trx, users, technology, true);
			}

			const { terms } = request.only(['terms']);
			if (terms) {
				await this.syncronizeTerms(trx, terms, technology, true);
			}

			await commit();

			if (users) {
				await technology.load('users');
			}

			if (terms) {
				await technology.load('terms.taxonomy');
			}
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		this.indexToAlgolia(technology);

		return technology;
	}
}

module.exports = TechnologyController;
